'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = createLoaders;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('graphbrainz:extensions/cover-art-archive');

function createLoaders(options) {
  const { client } = options;
  const cache = (0, _lruCache2.default)({
    max: options.cacheSize,
    maxAge: options.cacheTTL,
    dispose(key) {
      debug(`Removed from cache. key=${key}`);
    }
  });
  // Make the cache Map-like.
  cache.delete = cache.del;
  cache.clear = cache.reset;

  return {
    coverArtArchive: new _dataloader2.default(keys => {
      return _promise2.default.all(keys.map(key => {
        const [entityType, id] = key;
        return client.images(entityType, id).catch(err => {
          if (err.statusCode === 404) {
            return { images: [] };
          }
          throw err;
        }).then(coverArt => ({
          ...coverArt,
          _entityType: entityType,
          _id: id,
          _releaseID: coverArt.release && coverArt.release.split('/').pop()
        }));
      }));
    }, {
      cacheKeyFn: ([entityType, id]) => `${entityType}/${id}`,
      cacheMap: cache
    }),
    coverArtArchiveURL: new _dataloader2.default(keys => {
      return _promise2.default.all(keys.map(key => {
        const [entityType, id, type, size] = key;
        return client.imageURL(entityType, id, type, size);
      }));
    }, {
      batch: false,
      cacheKeyFn: ([entityType, id, type, size]) => {
        const key = `${entityType}/${id}/${type}`;
        return size ? `${key}-${size}` : key;
      },
      cacheMap: cache
    })
  };
}