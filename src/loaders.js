import DataLoader from 'dataloader'
import LRUCache from 'lru-cache'
import { toPlural } from './types/helpers'
import { ONE_DAY } from './util'

const debug = require('debug')('graphbrainz:loaders')

export default function createLoaders(client) {
  // All loaders share a single LRU cache that will remember 8192 responses,
  // each cached for 1 day.
  const cache = LRUCache({
    max: parseInt(process.env.GRAPHBRAINZ_CACHE_SIZE || 8192, 10),
    maxAge: parseInt(process.env.GRAPHBRAINZ_CACHE_TTL || ONE_DAY, 10),
    dispose(key) {
      debug(`Removed from cache. key=${key}`)
    }
  })
  // Make the cache Map-like.
  cache.delete = cache.del
  cache.clear = cache.reset

  const lookup = new DataLoader(
    keys => {
      return Promise.all(
        keys.map(key => {
          const [entityType, id, params = {}] = key
          return client.lookup(entityType, id, params).then(entity => {
            if (entity) {
              // Store the entity type so we can determine what type of object this
              // is elsewhere in the code.
              entity._type = entityType
            }
            return entity
          })
        })
      )
    },
    {
      batch: false,
      cacheKeyFn: key => client.getLookupURL(...key),
      cacheMap: cache
    }
  )

  const browse = new DataLoader(
    keys => {
      return Promise.all(
        keys.map(key => {
          const [entityType, params = {}] = key
          return client.browse(entityType, params).then(list => {
            list[toPlural(entityType)].forEach(entity => {
              // Store the entity type so we can determine what type of object this
              // is elsewhere in the code.
              entity._type = entityType
            })
            return list
          })
        })
      )
    },
    {
      batch: false,
      cacheKeyFn: key => client.getBrowseURL(...key),
      cacheMap: cache
    }
  )

  const search = new DataLoader(
    keys => {
      return Promise.all(
        keys.map(key => {
          const [entityType, query, params = {}] = key
          return client.search(entityType, query, params).then(list => {
            list[toPlural(entityType)].forEach(entity => {
              // Store the entity type so we can determine what type of object this
              // is elsewhere in the code.
              entity._type = entityType
            })
            return list
          })
        })
      )
    },
    {
      batch: false,
      cacheKeyFn: key => client.getSearchURL(...key),
      cacheMap: cache
    }
  )

  return { lookup, browse, search }
}
