import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { LookupQuery, BrowseQuery, SearchQuery } from './queries'
import { nodeField } from './types/node'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      node: nodeField,
      lookup: { type: LookupQuery, resolve: () => ({}) },
      browse: { type: BrowseQuery, resolve: () => ({}) },
      search: { type: SearchQuery, resolve: () => ({}) }
    })
  })
})
