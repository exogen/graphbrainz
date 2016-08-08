import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql/type'
import MBID from './mbid'
import { fieldWithID } from './helpers'

export default new GraphQLObjectType({
  name: 'Work',
  description:
    'A distinct intellectual or artistic creation, which can be expressed in ' +
    'the form of one or more audio recordings',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) },
    title: { type: GraphQLString },
    disambiguation: { type: GraphQLString },
    iswcs: { type: new GraphQLList(GraphQLString) },
    language: { type: GraphQLString },
    ...fieldWithID('type')
  })
})
