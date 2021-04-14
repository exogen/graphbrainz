import createDebug from 'debug';
import DataLoader from 'dataloader';
import LRUCache from 'lru-cache';

const debug = createDebug('graphbrainz:extensions/the-audio-db');

export default function createLoader(options) {
  const { client } = options;
  const cache = new LRUCache({
    max: options.cacheSize,
    maxAge: options.cacheTTL,
    dispose(key) {
      debug(`Removed from cache. key=${key}`);
    },
  });
  // Make the cache Map-like.
  cache.delete = cache.del;
  cache.clear = cache.reset;

  return new DataLoader(
    (keys) => {
      return Promise.all(
        keys.map((key) => {
          const [entityType, id] = key;
          return client.entity(entityType, id);
        })
      );
    },
    {
      batch: false,
      cacheKeyFn: ([entityType, id]) => `${entityType}/${id}`,
      cacheMap: cache,
    }
  );
}
