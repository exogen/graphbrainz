import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { lookupField, browseField, searchField } from './queries'
import { nodeField } from './types/node'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: `The query root, from which multiple types of MusicBrainz
requests can be made.`,
    fields: () => ({
      node: nodeField,
      lookup: lookupField,
      browse: browseField,
      search: searchField
    })
  })
})
