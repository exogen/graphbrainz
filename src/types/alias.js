import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean
} from 'graphql/type'
import MBID from './mbid'
import { getHyphenated } from './helpers'

export default new GraphQLObjectType({
  name: 'Alias',
  fields: () => ({
    name: { type: GraphQLString },
    sortName: { type: GraphQLString, resolve: getHyphenated },
    locale: { type: GraphQLString },
    primary: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    typeID: { type: MBID, resolve: getHyphenated }
  })
})
