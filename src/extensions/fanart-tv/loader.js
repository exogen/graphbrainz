import DataLoader from 'dataloader'
import LRUCache from 'lru-cache'

const debug = require('debug')('graphbrainz:extensions/fanart-tv')

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

  const loader = new DataLoader(
    keys => {
      return Promise.all(
        keys.map(key => {
          const [entityType, id] = key
          return client
            .musicEntity(entityType, id)
            .catch(err => {
              if (err.statusCode === 404) {
                // 404s are OK, just return empty data.
                return {
                  artistbackground: [],
                  artistthumb: [],
                  musiclogo: [],
                  hdmusiclogo: [],
                  musicbanner: [],
                  musiclabel: [],
                  albums: {}
                }
              }
              throw err
            })
            .then(body => {
              if (entityType === 'artist') {
                const releaseGroupIDs = Object.keys(body.albums || {})
                debug(
                  `Priming album cache with ${releaseGroupIDs.length} album(s).`
                )
                releaseGroupIDs.forEach(key =>
                  loader.prime(['release-group', key], body)
                )
              }
              return body
            })
        })
      )
    },
    {
      batch: false,
      cacheKeyFn: ([entityType, id]) => `${entityType}/${id}`,
      cacheMap: cache
    }
  )

  return loader
}
