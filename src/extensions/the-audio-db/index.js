import schema from './schema.js';
import resolvers from './resolvers.js';
import createLoader from './loader.js';
import TheAudioDBClient from './client.js';
import { ONE_DAY } from '../../util.js';

export default {
  name: 'TheAudioDB',
  description: `Retrieve images and information about artists, releases, and
recordings from [TheAudioDB.com](http://www.theaudiodb.com/).`,
  extendContext(context, { theAudioDB = {} } = {}) {
    const client = new TheAudioDBClient(theAudioDB);
    const cacheSize = parseInt(
      process.env.THEAUDIODB_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    );
    const cacheTTL = parseInt(
      process.env.THEAUDIODB_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    );
    return {
      ...context,
      loaders: {
        ...context.loaders,
        theAudioDB: createLoader({ client, cacheSize, cacheTTL }),
      },
    };
  },
  extendSchema: {
    schemas: [schema],
    resolvers,
  },
};
