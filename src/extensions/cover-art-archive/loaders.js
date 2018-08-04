import DataLoader from 'dataloader'
import LRUCache from 'lru-cache'

const debug = require('debug')('graphbrainz:extensions/cover-art-archive')

export default function createLoaders(options) {
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

  return {
    coverArtArchive: new DataLoader(
      keys => {
        return Promise.all(
          keys.map(key => {
            const [entityType, id] = key
            return client
              .images(entityType, id)
              .catch(err => {
                if (err.statusCode === 404) {
                  return { images: [] }
                }
                throw err
              })
              .then(coverArt => ({
                ...coverArt,
                _entityType: entityType,
                _id: id,
                _releaseID:
                  coverArt.release && coverArt.release.split('/').pop()
              }))
          })
        )
      },
      {
        cacheKeyFn: ([entityType, id]) => `${entityType}/${id}`,
        cacheMap: cache
      }
    ),
    coverArtArchiveURL: new DataLoader(
      keys => {
        return Promise.all(
          keys.map(key => {
            const [entityType, id, type, size] = key
            return client.imageURL(entityType, id, type, size)
          })
        )
      },
      {
        batch: false,
        cacheKeyFn: ([entityType, id, type, size]) => {
          const key = `${entityType}/${id}/${type}`
          return size ? `${key}-${size}` : key
        },
        cacheMap: cache
      }
    )
  }
}
