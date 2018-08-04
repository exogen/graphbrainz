import DataLoader from 'dataloader'
import LRUCache from 'lru-cache'

const debug = require('debug')('graphbrainz:extensions/mediawiki')

export default function createLoader(options) {
  const { client } = options
  const cache = LRUCache({
    max: options.cacheSize,
    maxAge: options.cacheTTL,
    dispose(key) {
      debug(`Removed from cache. key=${key}`)
    }
  })
  // Make the cache Map-like.
  cache.delete = cache.del
  cache.clear = cache.reset

  return new DataLoader(
    keys => {
      return Promise.all(keys.map(key => client.imageInfo(key)))
    },
    { batch: false, cacheMap: cache }
  )
}
