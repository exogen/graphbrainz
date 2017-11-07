import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'
import TheAudioDBClient from './client'
import { ONE_DAY } from '../../util'

export default {
  name: 'TheAudioDB',
  description: `Retrieve images and information about artists, releases, and
recordings from [TheAudioDB.com](http://www.theaudiodb.com/).`,
  extendContext(context, { theAudioDB = {} } = {}) {
    const client = new TheAudioDBClient(theAudioDB)
    const cacheSize = parseInt(
      process.env.THEAUDIODB_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    )
    const cacheTTL = parseInt(
      process.env.THEAUDIODB_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    )
    return {
      ...context,
      loaders: {
        ...context.loaders,
        theAudioDB: createLoader({ client, cacheSize, cacheTTL })
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
