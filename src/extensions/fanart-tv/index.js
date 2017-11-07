import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'
import FanArtClient from './client'
import { ONE_DAY } from '../../util'

export default {
  name: 'fanart.tv',
  description: `Retrieve high quality artwork for artists, releases, and labels
from [fanart.tv](https://fanart.tv/).`,
  extendContext(context, { fanArt = {} } = {}) {
    const client = new FanArtClient(fanArt)
    const cacheSize = parseInt(
      process.env.FANART_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    )
    const cacheTTL = parseInt(
      process.env.FANART_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    )
    return {
      ...context,
      loaders: {
        ...context.loaders,
        fanArt: createLoader({ client, cacheSize, cacheTTL })
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
