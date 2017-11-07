import { GraphQLObjectType, GraphQLString } from 'graphql'
import { forwardConnectionArgs } from 'graphql-relay'
import { resolveBrowse } from '../resolvers'
import {
  MBID,
  AreaConnection,
  ArtistConnection,
  CollectionConnection,
  EventConnection,
  DiscID,
  ISRC,
  ISWC,
  LabelConnection,
  PlaceConnection,
  RecordingConnection,
  ReleaseConnection,
  ReleaseGroupConnection,
  WorkConnection
} from '../types'
import { toWords, releaseGroupType, releaseStatus } from '../types/helpers'

const area = {
  type: MBID,
  description: 'The MBID of an area to which the entity is linked.'
}
const artist = {
  type: MBID,
  description: 'The MBID of an artist to which the entity is linked.'
}
const collection = {
  type: MBID,
  description: 'The MBID of a collection in which the entity is found.'
}
const event = {
  type: MBID,
  description: 'The MBID of an event to which the entity is linked.'
}
const label = {
  type: MBID,
  description: 'The MBID of a label to which the entity is linked.'
}
const place = {
  type: MBID,
  description: 'The MBID of a place to which the entity is linked.'
}
const recording = {
  type: MBID,
  description: 'The MBID of a recording to which the entity is linked.'
}
const release = {
  type: MBID,
  description: 'The MBID of a release to which the entity is linked.'
}
const releaseGroup = {
  type: MBID,
  description: 'The MBID of a release group to which the entity is linked.'
}
const work = {
  type: MBID,
  description: 'The MBID of a work to which the entity is linked.'
}

function createBrowseField(connectionType, args) {
  const typeName = toWords(connectionType.name.slice(0, -10))
  return {
    type: connectionType,
    description: `Browse ${typeName} entities linked to the given arguments.`,
    args: {
      ...args,
      ...forwardConnectionArgs
    },
    resolve: resolveBrowse
  }
}

export const BrowseQuery = new GraphQLObjectType({
  name: 'BrowseQuery',
  description: `A query for all MusicBrainz entities directly linked to another
entity.`,
  fields: {
    areas: createBrowseField(AreaConnection, {
      collection
    }),
    artists: createBrowseField(ArtistConnection, {
      area,
      collection,
      recording,
      release,
      releaseGroup,
      work
    }),
    collections: createBrowseField(CollectionConnection, {
      area,
      artist,
      editor: {
        type: GraphQLString,
        description: 'The username of the editor who created the collection.'
      },
      event,
      label,
      place,
      recording,
      release,
      releaseGroup,
      work
    }),
    events: createBrowseField(EventConnection, {
      area,
      artist,
      collection,
      place
    }),
    labels: createBrowseField(LabelConnection, {
      area,
      collection,
      release
    }),
    places: createBrowseField(PlaceConnection, {
      area,
      collection
    }),
    recordings: createBrowseField(RecordingConnection, {
      artist,
      collection,
      isrc: {
        type: ISRC,
        description: `The [International Standard Recording Code](https://musicbrainz.org/doc/ISRC)
(ISRC) of the recording.`
      },
      release
    }),
    releases: createBrowseField(ReleaseConnection, {
      area,
      artist,
      collection,
      discID: {
        type: DiscID,
        description: `A [disc ID](https://musicbrainz.org/doc/Disc_ID)
associated with the release.`
      },
      label,
      recording,
      releaseGroup,
      track: {
        type: MBID,
        description: 'The MBID of a track that is included in the release.'
      },
      trackArtist: {
        type: MBID,
        description: `The MBID of an artist that appears on a track in the
release, but is not included in the credits for the release itself.`
      },
      type: releaseGroupType,
      status: releaseStatus
    }),
    releaseGroups: createBrowseField(ReleaseGroupConnection, {
      artist,
      collection,
      release,
      type: releaseGroupType
    }),
    works: createBrowseField(WorkConnection, {
      artist,
      collection,
      iswc: {
        type: ISWC,
        description: `The [International Standard Musical Work Code](https://musicbrainz.org/doc/ISWC)
(ISWC) of the work.`
      }
    })
  }
})

export const browse = {
  type: BrowseQuery,
  description:
    'Browse all MusicBrainz entities directly linked to another entity.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
}

export default BrowseQuery
