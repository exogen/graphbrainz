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

var _helpers = require('./types/helpers');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('graphbrainz:loaders');

function createLoaders(client) {
  // All loaders share a single LRU cache that will remember 8192 responses,
  // each cached for 1 day.
  const cache = (0, _lruCache2.default)({
    max: parseInt(process.env.GRAPHBRAINZ_CACHE_SIZE || 8192, 10),
    maxAge: parseInt(process.env.GRAPHBRAINZ_CACHE_TTL || _util.ONE_DAY, 10),
    dispose(key) {
      debug(`Removed from cache. key=${key}`);
    }
  });
  // Make the cache Map-like.
  cache.delete = cache.del;
  cache.clear = cache.reset;

  const lookup = new _dataloader2.default(keys => {
    return _promise2.default.all(keys.map(key => {
      const [entityType, id, params = {}] = key;
      return client.lookup(entityType, id, params).then(entity => {
        if (entity) {
          // Store the entity type so we can determine what type of object this
          // is elsewhere in the code.
          entity._type = entityType;
        }
        return entity;
      });
    }));
  }, {
    batch: false,
    cacheKeyFn: key => client.getLookupURL(...key),
    cacheMap: cache
  });

  const browse = new _dataloader2.default(keys => {
    return _promise2.default.all(keys.map(key => {
      const [entityType, params = {}] = key;
      return client.browse(entityType, params).then(list => {
        list[(0, _helpers.toPlural)(entityType)].forEach(entity => {
          // Store the entity type so we can determine what type of object this
          // is elsewhere in the code.
          entity._type = entityType;
        });
        return list;
      });
    }));
  }, {
    batch: false,
    cacheKeyFn: key => client.getBrowseURL(...key),
    cacheMap: cache
  });

  const search = new _dataloader2.default(keys => {
    return _promise2.default.all(keys.map(key => {
      const [entityType, query, params = {}] = key;
      return client.search(entityType, query, params).then(list => {
        list[(0, _helpers.toPlural)(entityType)].forEach(entity => {
          // Store the entity type so we can determine what type of object this
          // is elsewhere in the code.
          entity._type = entityType;
        });
        return list;
      });
    }));
  }, {
    batch: false,
    cacheKeyFn: key => client.getSearchURL(...key),
    cacheMap: cache
  });

  return { lookup, browse, search };
}