import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import { toDashed } from './helpers'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalID, { loaders }) => {
    const { type, id } = fromGlobalId(globalID)
    const entityType = toDashed(type)
    return loaders.lookup.load([entityType, id])
  },
  (obj) => {
    try {
      return require(`./${obj._type}`).default
    } catch (err) {
      console.error(err)
      return null
    }
  }
)

export default nodeInterface
export { nodeInterface, nodeField }
