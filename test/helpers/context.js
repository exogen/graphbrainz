import createLoaders from '../../src/loaders'
import client from './client'

export default {
  client,
  loaders: createLoaders(client)
}
