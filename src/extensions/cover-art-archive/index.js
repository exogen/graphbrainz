import schema from './schema'
import resolvers from './resolvers'
import createLoaders from './loaders'
import CoverArtArchiveClient from './client'
import { ONE_DAY } from '../../util'

export default {
  name: 'Cover Art Archive',
  description: `Retrieve cover art images for releases from the [Cover Art
Archive](https://coverartarchive.org/).`,
  extendContext(context, { coverArtClient, coverArtArchive = {} } = {}) {
    const client = coverArtClient || new CoverArtArchiveClient(coverArtArchive)
    const cacheSize = parseInt(
      process.env.COVER_ART_ARCHIVE_CACHE_SIZE ||
        process.env.GRAPHBRAINZ_CACHE_SIZE ||
        8192,
      10
    )
    const cacheTTL = parseInt(
      process.env.COVER_ART_ARCHIVE_CACHE_TTL ||
        process.env.GRAPHBRAINZ_CACHE_TTL ||
        ONE_DAY,
      10
    )
    return {
      ...context,
      // Add the client instance directly onto `context` for backwards
      // compatibility.
      coverArtClient: client,
      loaders: {
        ...context.loaders,
        ...createLoaders({ client, cacheSize, cacheTTL })
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
