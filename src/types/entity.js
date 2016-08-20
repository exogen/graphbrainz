import { GraphQLInterfaceType } from 'graphql/type'
import { id } from './helpers'

export default new GraphQLInterfaceType({
  name: 'Entity',
  description: 'An entity in the MusicBrainz schema.',
  resolveType (value) {
    if (value.entityType && require.resolve(`./${value.entityType}`)) {
      return require(`./${value.entityType}`).default
    }
  },
  fields: () => ({
    id
  })
})
