import { GraphQLObjectType } from 'graphql'
import { forwardConnectionArgs } from 'graphql-relay'
import { resolveBrowse } from '../resolvers'
import {
  MBID,
  URLString,
  AreaConnection,
  ArtistConnection,
  EventConnection,
  LabelConnection,
  PlaceConnection,
  RecordingConnection,
  ReleaseConnection,
  ReleaseGroupConnection,
  URLConnection,
  WorkConnection
} from '../types'
import { toWords } from '../types/helpers'

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

function createBrowseField (connectionType, args) {
  const typeName = toWords(connectionType.name.slice(0, -10))
  return {
    type: connectionType,
    description: `Browse ${typeName} entities linked to the given arguments.`,
    args: {
      ...forwardConnectionArgs,
      ...args
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
      work: {
        type: MBID,
        description: 'The MBID of a work to which the artist is linked.'
      }
    }),
    events: createBrowseField(EventConnection, {
      area,
      artist,
      collection,
      place: {
        type: MBID,
        description: 'The MBID of a place to which the event is linked.'
      }
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
      release
    }),
    releases: createBrowseField(ReleaseConnection, {
      area,
      artist,
      collection,
      label: {
        type: MBID,
        description: 'The MBID of a label to which the release is linked.'
      },
      track: {
        type: MBID,
        description: 'The MBID of a track that is included in the release.'
      },
      trackArtist: {
        type: MBID,
        description: `The MBID of an artist that appears on a track in the
release, but is not included in the credits for the release itself.`
      },
      recording,
      releaseGroup
    }),
    releaseGroups: createBrowseField(ReleaseGroupConnection, {
      artist,
      collection,
      release
    }),
    works: createBrowseField(WorkConnection, {
      artist,
      collection
    }),
    urls: createBrowseField(URLConnection, {
      resource: {
        type: URLString,
        description: 'The web address for which to browse URL entities.'
      }
    })
  }
})

export const browse = {
  type: BrowseQuery,
  description: 'Browse all MusicBrainz entities directly linked to another entity.',
  // We only have work to do once we know what entity types are being requested,
  // so this can just resolve to an empty object.
  resolve: () => ({})
}

export default BrowseQuery
