import { GraphQLObjectType } from 'graphql'
import { forwardConnectionArgs } from 'graphql-relay'
import { browseResolver } from '../resolvers'
import {
  MBID,
  URLString,
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

function browseQuery (connectionType, args) {
  return {
    type: connectionType,
    args: {
      ...forwardConnectionArgs,
      ...args
    },
    resolve: browseResolver()
  }
}

export default new GraphQLObjectType({
  name: 'BrowseQuery',
  description:
    'Browse requests are a direct lookup of all the entities directly linked ' +
    'to another entity.',
  fields: {
    artists: browseQuery(ArtistConnection, {
      area: { type: MBID },
      recording: { type: MBID },
      release: { type: MBID },
      releaseGroup: { type: MBID },
      work: { type: MBID }
    }),
    events: browseQuery(EventConnection, {
      area: { type: MBID },
      artist: { type: MBID },
      place: { type: MBID }
    }),
    labels: browseQuery(LabelConnection, {
      area: { type: MBID },
      release: { type: MBID }
    }),
    places: browseQuery(PlaceConnection, {
      area: { type: MBID }
    }),
    recordings: browseQuery(RecordingConnection, {
      artist: { type: MBID },
      release: { type: MBID }
    }),
    releases: browseQuery(ReleaseConnection, {
      area: { type: MBID },
      artist: { type: MBID },
      label: { type: MBID },
      track: { type: MBID },
      trackArtist: { type: MBID },
      recording: { type: MBID },
      releaseGroup: { type: MBID }
    }),
    releaseGroups: browseQuery(ReleaseGroupConnection, {
      artist: { type: MBID },
      release: { type: MBID }
    }),
    works: browseQuery(WorkConnection, {
      artist: { type: MBID }
    }),
    urls: browseQuery(URLConnection, {
      resource: { type: URLString }
    })
  }
})
