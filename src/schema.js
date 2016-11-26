import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { LookupQuery, BrowseQuery, SearchQuery } from './queries'
import { nodeField } from './types/node'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: `The query root, from which multiple types of MusicBrainz
requests can be made.`,
    fields: () => ({
      node: nodeField,
      lookup: {
        type: LookupQuery,
        description: 'Perform a lookup of a MusicBrainz entity by its MBID.',
        resolve: () => ({})
      },
      browse: {
        type: BrowseQuery,
        description: `Browse all MusicBrainz entities directly linked to another
entity.`,
        resolve: () => ({})
      },
      search: {
        type: SearchQuery,
        description: `Search for MusicBrainz entities using Lucene query
syntax.`,
        resolve: () => ({})
      }
    })
  })
})
