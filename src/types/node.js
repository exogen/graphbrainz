import { nodeDefinitions, fromGlobalId } from 'graphql-relay'
import { toDashed } from './helpers'

const debug = require('debug')('graphbrainz:types/node')

const TYPE_MODULES = {
  discid: 'disc'
}

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalID, { loaders }) => {
    const { type, id } = fromGlobalId(globalID)
    const entityType = toDashed(type)
    return loaders.lookup.load([entityType, id])
  },
  (obj) => {
    const type = TYPE_MODULES[obj._type] || obj._type
    try {
      return require(`./${type}`).default
    } catch (err) {
      debug(`Failed to load type: ${type}`)
      return null
    }
  }
)

export default nodeInterface
export { nodeInterface, nodeField }
