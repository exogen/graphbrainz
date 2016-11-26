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
import { toWords } from '../types/helpers'

function searchQuery (connectionType) {
  const typeName = toWords(connectionType.name.slice(0, -10))
  return {
    type: connectionType,
    description: `Search for ${typeName} entities matching the given query.`,
    args: {
      query: { type: new GraphQLNonNull(GraphQLString) },
      ...forwardConnectionArgs
    },
    resolve: searchResolver()
  }
}

export default new GraphQLObjectType({
  name: 'SearchQuery',
  description: 'A search for MusicBrainz entities using Lucene query syntax.',
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
