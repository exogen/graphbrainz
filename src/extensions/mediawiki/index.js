import schema from './schema.js';
import resolvers from './resolvers.js';
import createLoader from './loader.js';
import MediaWikiClient from './client.js';
import { ONE_DAY } from '../../util.js';

export default {
  name: 'MediaWiki',
  description: `Retrieve information from MediaWiki image pages, like the actual
image file URL and EXIF metadata.`,
  extendContext(context, { mediaWiki = {} } = {}) {
    const client = new MediaWikiClient(mediaWiki);
    const cacheSize = parseInt(
      process.env.MEDIAWIKI_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    );
    const cacheTTL = parseInt(
      process.env.MEDIAWIKI_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    );
    return {
      ...context,
      loaders: {
        ...context.loaders,
        mediaWiki: createLoader({ client, cacheSize, cacheTTL }),
      },
    };
  },
  extendSchema: {
    schemas: [schema],
    resolvers,
  },
};
