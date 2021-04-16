import schema from './schema.js';
import resolvers from './resolvers.js';
import createLoaders from './loaders.js';
import CoverArtArchiveClient from './client.js';
import { ONE_DAY } from '../../util.js';

export default {
  name: 'Cover Art Archive',
  description: `Retrieve cover art images for releases from the [Cover Art
Archive](https://coverartarchive.org/).`,
  extendContext(context, { coverArtClient, coverArtArchive = {} } = {}) {
    const client = coverArtClient || new CoverArtArchiveClient(coverArtArchive);
    const cacheSize = parseInt(
      process.env.COVER_ART_ARCHIVE_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    );
    const cacheTTL = parseInt(
      process.env.COVER_ART_ARCHIVE_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    );
    return {
      ...context,
      // Add the client instance directly onto `context` for backwards
      // compatibility.
      coverArtClient: client,
      loaders: {
        ...context.loaders,
        ...createLoaders({ client, cacheSize, cacheTTL }),
      },
    };
  },
  extendSchema: {
    schemas: [schema],
    resolvers,
  },
};
