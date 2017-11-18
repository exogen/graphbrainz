import { GraphQLInterfaceType } from 'graphql'
import { mbid, connectionWithExtras } from './helpers'

const Entity = new GraphQLInterfaceType({
  name: 'Entity',
  description: 'An entity in the MusicBrainz schema.',
  resolveType(value, context, info) {
    if (value._type) {
      const typeMap = info.schema.getTypeMap()
      let originalType
      try {
        originalType = require(`./${value._type}`).default
      } catch (err) {
        return
      }
      // Don't use `originalType`! The schema may have been extended in which
      // case the types have all been replaced. Instead, find the current type
      // of the same name.
      return typeMap[originalType.name]
    }
  },
  fields: () => ({ mbid })
})

export const EntityConnection = connectionWithExtras(Entity)
export default Entity
