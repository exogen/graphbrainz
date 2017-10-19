import createLoaders from '../../src/loaders'
import client from './client/musicbrainz'

export default {
  client,
  loaders: createLoaders(client)
}
