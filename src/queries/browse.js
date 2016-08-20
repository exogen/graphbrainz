import { GraphQLObjectType, GraphQLInt } from 'graphql'
import {
  MBID,
  URLString,
  ArtistPage,
  EventPage,
  LabelPage,
  PlacePage,
  RecordingPage,
  ReleasePage,
  ReleaseGroupPage,
  URLPage,
  WorkPage
} from '../types'
import { browseResolver } from '../resolvers'

export default new GraphQLObjectType({
  name: 'BrowseQuery',
  description:
    'Browse requests are a direct lookup of all the entities directly linked ' +
    'to another entity.',
  fields: {
    artists: {
      type: ArtistPage,
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
      type: EventPage,
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
      type: LabelPage,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        area: { type: MBID },
        release: { type: MBID }
      },
      resolve: browseResolver()
    },
    places: {
      type: PlacePage,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        area: { type: MBID }
      },
      resolve: browseResolver()
    },
    recordings: {
      type: RecordingPage,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        artist: { type: MBID },
        release: { type: MBID }
      },
      resolve: browseResolver()
    },
    releases: {
      type: ReleasePage,
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
      type: ReleaseGroupPage,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        artist: { type: MBID },
        release: { type: MBID }
      },
      resolve: browseResolver()
    },
    works: {
      type: WorkPage,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        artist: { type: MBID }
      },
      resolve: browseResolver()
    },
    urls: {
      type: URLPage,
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        resource: { type: URLString }
      },
      resolve: browseResolver()
    }
  }
})
