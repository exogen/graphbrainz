import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'
import MediaWikiClient from './client'
import { ONE_DAY } from '../../util'

export default {
  name: 'MediaWiki',
  description: `Retrieve information from MediaWiki image pages, like the actual
image file URL and EXIF metadata.`,
  extendContext(context, { mediaWiki = {} } = {}) {
    const client = new MediaWikiClient(mediaWiki)
    const cacheSize = parseInt(
      process.env.MEDIAWIKI_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    )
    const cacheTTL = parseInt(
      process.env.MEDIAWIKI_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    )
    return {
      ...context,
      loaders: {
        ...context.loaders,
        mediaWiki: createLoader({ client, cacheSize, cacheTTL })
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
