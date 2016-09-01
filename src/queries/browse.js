import { GraphQLObjectType, GraphQLInt } from 'graphql'
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
import { browseResolver } from '../resolvers'

export default new GraphQLObjectType({
  name: 'BrowseQuery',
  description:
    'Browse requests are a direct lookup of all the entities directly linked ' +
    'to another entity.',
  fields: {
    artists: {
      type: ArtistConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        area: { type: MBID },
        recording: { type: MBID },
        release: { type: MBID },
        releaseGroup: { type: MBID },
        work: { type: MBID }
      },
      resolve: browseResolver()
    },
    events: {
      type: EventConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        area: { type: MBID },
        artist: { type: MBID },
        place: { type: MBID }
      },
      resolve: browseResolver()
    },
    labels: {
      type: LabelConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        area: { type: MBID },
        release: { type: MBID }
      },
      resolve: browseResolver()
    },
    places: {
      type: PlaceConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        area: { type: MBID }
      },
      resolve: browseResolver()
    },
    recordings: {
      type: RecordingConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        artist: { type: MBID },
        release: { type: MBID }
      },
      resolve: browseResolver()
    },
    releases: {
      type: ReleaseConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        area: { type: MBID },
        artist: { type: MBID },
        label: { type: MBID },
        track: { type: MBID },
        trackArtist: { type: MBID },
        recording: { type: MBID },
        releaseGroup: { type: MBID }
      },
      resolve: browseResolver()
    },
    releaseGroups: {
      type: ReleaseGroupConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        artist: { type: MBID },
        release: { type: MBID }
      },
      resolve: browseResolver()
    },
    works: {
      type: WorkConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        artist: { type: MBID }
      },
      resolve: browseResolver()
    },
    urls: {
      type: URLConnection,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        resource: { type: URLString }
      },
      resolve: browseResolver()
    }
  }
})
