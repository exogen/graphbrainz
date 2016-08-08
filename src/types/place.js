import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql/type'
import MBID from './mbid'
import AreaType from './area'
import LifeSpanType from './life-span'
import { getHyphenated, fieldWithID } from './helpers'

export default new GraphQLObjectType({
  name: 'Place',
  description:
    'A venue, studio or other place where music is performed, recorded, ' +
    'engineered, etc.',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) },
    name: { type: GraphQLString },
    disambiguation: { type: GraphQLString },
    address: { type: GraphQLString },
    area: { type: AreaType },
    coordinates: {
      type: new GraphQLObjectType({
        name: 'Coordinates',
        fields: () => ({
          latitude: { type: GraphQLString },
          longitude: { type: GraphQLString }
        })
      })
    },
    lifeSpan: { type: LifeSpanType, resolve: getHyphenated },
    ...fieldWithID('type')
  })
})
