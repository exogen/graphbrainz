import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql'
import { forwardConnectionArgs } from 'graphql-relay'
import { searchResolver } from '../resolvers'
import {
  AreaConnection,
  ArtistConnection,
  LabelConnection,
  PlaceConnection,
  RecordingConnection,
  ReleaseConnection,
  ReleaseGroupConnection,
  WorkConnection
} from '../types'

function searchQuery (connectionType) {
  return {
    type: connectionType,
    args: {
      query: { type: new GraphQLNonNull(GraphQLString) },
      ...forwardConnectionArgs
    },
    resolve: searchResolver()
  }
}

export default new GraphQLObjectType({
  name: 'SearchQuery',
  description:
    'Search queries provide a way to search for MusicBrainz entities using ' +
    'Lucene query syntax.',
  fields: {
    areas: searchQuery(AreaConnection),
    artists: searchQuery(ArtistConnection),
    labels: searchQuery(LabelConnection),
    places: searchQuery(PlaceConnection),
    recordings: searchQuery(RecordingConnection),
    releases: searchQuery(ReleaseConnection),
    releaseGroups: searchQuery(ReleaseGroupConnection),
    works: searchQuery(WorkConnection)
  }
})
