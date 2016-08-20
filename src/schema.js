import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { LookupQuery, BrowseQuery, SearchQuery } from './queries'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      lookup: { type: LookupQuery, resolve: () => ({}) },
      browse: { type: BrowseQuery, resolve: () => ({}) },
      search: { type: SearchQuery, resolve: () => ({}) }
    })
  })
})
