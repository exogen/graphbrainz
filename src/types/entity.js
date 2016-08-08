import { GraphQLInterfaceType, GraphQLNonNull } from 'graphql/type'
import MBID from './mbid'

export default new GraphQLInterfaceType({
  name: 'Entity',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) }
  })
})
