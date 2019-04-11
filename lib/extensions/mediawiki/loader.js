'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = createLoader;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('graphbrainz:extensions/mediawiki');

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

  return new _dataloader2.default(keys => {
    return _promise2.default.all(keys.map(key => client.imageInfo(key)));
  }, { batch: false, cacheMap: cache });
}