import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import {
  id,
  mbid,
  title,
  disambiguation,
  artists,
  relations,
  fieldWithID
} from './helpers'

const Work = new GraphQLObjectType({
  name: 'Work',
  description:
    'A distinct intellectual or artistic creation, which can be expressed in ' +
    'the form of one or more audio recordings',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    iswcs: { type: new GraphQLList(GraphQLString) },
    language: { type: GraphQLString },
    ...fieldWithID('type'),
    artists,
    relations
  })
})

const { connectionType: WorkConnection } = connectionDefinitions({ nodeType: Work })
export { WorkConnection }
export default Work
