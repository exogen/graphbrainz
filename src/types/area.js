import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql/type'
import MBID from './mbid'
import { getHyphenated } from './helpers'

export default new GraphQLObjectType({
  name: 'Area',
  description: 'A country, region, city or the like.',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) },
    disambiguation: { type: GraphQLString },
    name: { type: GraphQLString },
    sortName: { type: GraphQLString, resolve: getHyphenated },
    isoCodes: { type: new GraphQLList(GraphQLString), resolve: data => data['iso-3166-1-codes'] }
  })
})
