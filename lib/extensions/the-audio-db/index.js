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
  name: 'TheAudioDB',
  description: `Retrieve images and information about artists, releases, and
recordings from [TheAudioDB.com](http://www.theaudiodb.com/).`,
  extendContext(context, { theAudioDB = {} } = {}) {
    const client = new _client2.default(theAudioDB);
    const cacheSize = parseInt(process.env.THEAUDIODB_CACHE_SIZE || process.env.GRAPHBRAINZ_CACHE_SIZE || 8192, 10);
    const cacheTTL = parseInt(process.env.THEAUDIODB_CACHE_TTL || process.env.GRAPHBRAINZ_CACHE_TTL || _util.ONE_DAY, 10);
    return {
      ...context,
      loaders: {
        ...context.loaders,
        theAudioDB: (0, _loader2.default)({ client, cacheSize, cacheTTL })
      }
    };
  },
  extendSchema: {
    schemas: [_schema2.default],
    resolvers: _resolvers2.default
  }
};