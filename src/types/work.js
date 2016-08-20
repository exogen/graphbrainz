import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import Entity from './entity'
import {
  id,
  title,
  disambiguation,
  artists,
  relations,
  fieldWithID,
  createPageType
} from './helpers'

const Work = new GraphQLObjectType({
  name: 'Work',
  description:
    'A distinct intellectual or artistic creation, which can be expressed in ' +
    'the form of one or more audio recordings',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    title,
    disambiguation,
    iswcs: { type: new GraphQLList(GraphQLString) },
    language: { type: GraphQLString },
    ...fieldWithID('type'),
    artists,
    relations
  })
})

export const WorkPage = createPageType(Work)
export default Work
