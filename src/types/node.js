import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import { lookupLoader } from '../loaders'
import { toEntityType } from './helpers'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalID) => {
    const { type, id } = fromGlobalId(globalID)
    const entityType = toEntityType(type)
    return lookupLoader.load([entityType, id])
  },
  (obj) => {
    try {
      return require(`./${obj.entityType}`)
    } catch (err) {
      return null
    }
  }
)

export default nodeInterface
export { nodeInterface, nodeField }
