import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import { toDashed } from './helpers'

const debug = require('debug')('graphbrainz:types/node')

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
      debug(`Failed to load type: ${obj._type}`)
      return null
    }
  }
)

export default nodeInterface
export { nodeInterface, nodeField }
