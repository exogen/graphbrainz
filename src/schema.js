import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { lookup, browse, search } from './queries'
import { nodeField } from './types/node'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: `The query root, from which multiple types of MusicBrainz
requests can be made.`,
    fields: () => ({
      lookup,
      browse,
      search,
      node: nodeField
    })
  })
})
