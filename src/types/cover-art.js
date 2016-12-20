import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt
} from 'graphql/type'
import CoverArtImage from './cover-art-image'
import { CoverArtImageSize } from './enums'
import Release from './release'
import { URLString } from './scalars'
import { resolveLookup } from '../resolvers'
import { getFields } from '../util'

/**
 * Return a resolver that will call `resolveFn` only if the requested field on
 * the object is null or not present.
 */
function createFallbackResolver (resolveFn) {
  return function resolve (coverArt, args, context, info) {
    const value = coverArt[info.fieldName]
    if (value == null) {
      return resolveFn(coverArt, args, context, info)
    }
    return value
  }
}

function resolveImage (coverArt, { size }, { loaders }, info) {
  if (size === 'FULL') {
    size = null
  }
  const field = info.fieldName
  if (coverArt.images) {
    const matches = coverArt.images.filter(image => image[field])
    if (!matches.length) {
      return null
    } else if (matches.length === 1) {
      const match = matches[0]
      if (size === 250) {
        return match.thumbnails.small
      } else if (size === 500) {
        return match.thumbnails.large
      } else {
        return match.image
      }
    }
  }
  if (coverArt[field] !== false) {
    const {
      _parentType: entityType = 'release',
      _parentID: id = coverArt._release
    } = coverArt
    return loaders.coverArtURL.load([entityType, id, field, size])
  }
}

const size = {
  type: CoverArtImageSize,
  description: `The size of the image to retrieve. By default, the returned
image will have its full original dimensions, but certain thumbnail sizes may be
retrieved as well.`,
  defaultValue: null
}

/**
 * Get around both the circular dependency between the release and cover art
 * types, and not have to define an identical `release` field twice on
 * `ReleaseCoverArt` and `ReleaseGroupCoverArt`.
 */
function createReleaseField () {
  return {
    type: new GraphQLNonNull(Release),
    description: 'The particular release shown in the returned cover art.',
    resolve: (coverArt, args, context, info) => {
      const id = coverArt._release
      const fields = Object.keys(getFields(info))
      if (fields.length > 1 || fields[0] !== 'mbid') {
        return resolveLookup(coverArt, { mbid: id }, context, info)
      }
      return { id }
    }
  }
}

// This type combines two sets of data from different places. One is a *summary*
// of the images available at the Cover Art Archive, found in the `cover-art-archive`
// field on releases. The other is the actual list of images with their metadata,
// fetched from the Cover Art Archive itself rather than MusicBrainz. Depending
// on what fields are requested, we may only need to fetch one or the other, or
// both. Much of the summary data can be reconstructed if we already fetched the
// full image list, for example.
export const ReleaseCoverArt = new GraphQLObjectType({
  name: 'ReleaseCoverArt',
  description: `An object containing a list of the cover art images for a
release obtained from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive),
as well as a summary of what artwork is available.`,
  fields: () => ({
    front: {
      type: URLString,
      description: `The URL of an image depicting the album cover or “main
front” of the release, i.e. the front of the packaging of the audio recording
(or in the case of a digital release, the image associated with it in a digital
media store).

In the MusicBrainz schema, this field is a Boolean value indicating the presence
of a front image, whereas here the value is the URL for the image itself if one
exists. You can check for null if you just want to determine the presence of an
image.`,
      args: { size },
      resolve: resolveImage
    },
    back: {
      type: URLString,
      description: `The URL of an image depicting the “main back” of the
release, i.e. the back of the packaging of the audio recording.

In the MusicBrainz schema, this field is a Boolean value indicating the presence
of a back image, whereas here the value is the URL for the image itself. You can
check for null if you just want to determine the presence of an image.`,
      args: { size },
      resolve: resolveImage
    },
    images: {
      type: new GraphQLList(CoverArtImage),
      description: `A list of images depicting the different sides and surfaces
of a release’s media and packaging.`,
      resolve: createFallbackResolver((coverArt, args, { loaders }) => {
        if (coverArt.count === 0) {
          return []
        }
        return loaders.coverArt.load(['release', coverArt._release])
          .then(coverArt => coverArt.images)
      })
    },
    artwork: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether there is artwork present for this release.',
      resolve: createFallbackResolver(coverArt => coverArt.images.length > 0)
    },
    darkened: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: `Whether the Cover Art Archive has received a take-down
request for this release’s artwork, disallowing new uploads.`,
      resolve: createFallbackResolver((coverArt, args, { loaders }) => {
        return loaders.lookup.load(['release', coverArt._release])
          .then(release => release['cover-art-archive'].darkened)
      })
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of artwork images present for this release.',
      resolve: createFallbackResolver(coverArt => coverArt.images.length)
    },
    release: createReleaseField()
  })
})

export const ReleaseGroupCoverArt = new GraphQLObjectType({
  name: 'ReleaseGroupCoverArt',
  description: `An object containing the cover art for a release group obtained
from the [Cover Art Archive](https://musicbrainz.org/doc/Cover_Art_Archive). For
release groups, just the front cover of particular release will be selected.`,
  fields: () => ({
    front: {
      type: URLString,
      description: `The URL of an image depicting the album cover or “main
front” of a release in the release group, i.e. the front of the packaging of the
audio recording (or in the case of a digital release, the image associated with
it in a digital media store).`,
      args: { size },
      resolve: resolveImage
    },
    images: {
      type: new GraphQLList(CoverArtImage),
      description: `A list of images returned by the [Cover Art
Archive](https://musicbrainz.org/doc/Cover_Art_Archive) for a release group. A
particular release’s front image will be included in the list, and likely no
others, even if other images are available.`
    },
    artwork: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'Whether there is artwork present for this release group.',
      resolve: createFallbackResolver(coverArt => coverArt.images.length > 0)
    },
    release: createReleaseField()
  })
})
