'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'fanart.tv',
  description: `Retrieve high quality artwork for artists, releases, and labels
from [fanart.tv](https://fanart.tv/).`,
  extendContext(context, { fanArt = {} } = {}) {
    const client = new _client2.default(fanArt);
    const cacheSize = parseInt(process.env.FANART_CACHE_SIZE || process.env.GRAPHBRAINZ_CACHE_SIZE || 8192, 10);
    const cacheTTL = parseInt(process.env.FANART_CACHE_TTL || process.env.GRAPHBRAINZ_CACHE_TTL || _util.ONE_DAY, 10);
    return {
      ...context,
      loaders: {
        ...context.loaders,
        fanArt: (0, _loader2.default)({ client, cacheSize, cacheTTL })
      }
    };
  },
  extendSchema: {
    schemas: [_schema2.default],
    resolvers: _resolvers2.default
  }
};