import schema from './schema.js';
import resolvers from './resolvers.js';
import createLoader from './loader.js';
import FanArtClient from './client.js';
import { ONE_DAY } from '../../util.js';

export default {
  name: 'fanart.tv',
  description: `Retrieve high quality artwork for artists, releases, and labels
from [fanart.tv](https://fanart.tv/).`,
  extendContext(context, { fanArt = {} } = {}) {
    const client = new FanArtClient(fanArt);
    const cacheSize = parseInt(
      process.env.FANART_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    );
    const cacheTTL = parseInt(
      process.env.FANART_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    );
    return {
      ...context,
      loaders: {
        ...context.loaders,
        fanArt: createLoader({ client, cacheSize, cacheTTL }),
      },
    };
  },
  extendSchema: {
    schemas: [schema],
    resolvers,
  },
};
