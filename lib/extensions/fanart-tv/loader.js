'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = createLoader;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('graphbrainz:extensions/fanart-tv');

function createLoader(options) {
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

  const loader = new _dataloader2.default(keys => {
    return _promise2.default.all(keys.map(key => {
      const [entityType, id] = key;
      return client.musicEntity(entityType, id).catch(err => {
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
          };
        }
        throw err;
      }).then(body => {
        if (entityType === 'artist') {
          const releaseGroupIDs = (0, _keys2.default)(body.albums || {});
          debug(`Priming album cache with ${releaseGroupIDs.length} album(s).`);
          releaseGroupIDs.forEach(key => loader.prime(['release-group', key], body));
        }
        return body;
      });
    }));
  }, {
    batch: false,
    cacheKeyFn: ([entityType, id]) => `${entityType}/${id}`,
    cacheMap: cache
  });

  return loader;
}