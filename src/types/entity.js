import { GraphQLInterfaceType } from 'graphql'
import { mbid } from './helpers'

export default new GraphQLInterfaceType({
  name: 'Entity',
  description: 'An entity in the MusicBrainz schema.',
  resolveType (value) {
    if (value._type && require.resolve(`./${value._type}`)) {
      return require(`./${value._type}`).default
    }
  },
  fields: () => ({ mbid })
})
