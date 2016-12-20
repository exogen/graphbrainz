import createLoaders from '../../src/loaders'
import client from './client/musicbrainz'
import coverArtClient from './client/cover-art-archive'

export default {
  client,
  coverArtClient,
  loaders: createLoaders(client, coverArtClient)
}
