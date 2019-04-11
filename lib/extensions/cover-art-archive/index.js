'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _loaders = require('./loaders');

var _loaders2 = _interopRequireDefault(_loaders);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'Cover Art Archive',
  description: `Retrieve cover art images for releases from the [Cover Art
Archive](https://coverartarchive.org/).`,
  extendContext(context, { coverArtClient, coverArtArchive = {} } = {}) {
    const client = coverArtClient || new _client2.default(coverArtArchive);
    const cacheSize = parseInt(process.env.COVER_ART_ARCHIVE_CACHE_SIZE || process.env.GRAPHBRAINZ_CACHE_SIZE || 8192, 10);
    const cacheTTL = parseInt(process.env.COVER_ART_ARCHIVE_CACHE_TTL || process.env.GRAPHBRAINZ_CACHE_TTL || _util.ONE_DAY, 10);
    return {
      ...context,
      // Add the client instance directly onto `context` for backwards
      // compatibility.
      coverArtClient: client,
      loaders: {
        ...context.loaders,
        ...(0, _loaders2.default)({ client, cacheSize, cacheTTL })
      }
    };
  },
  extendSchema: {
    schemas: [_schema2.default],
    resolvers: _resolvers2.default
  }
};