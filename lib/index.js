'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultExtensions = undefined;
exports.start = start;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _context = require('./context');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatError = err => ({
  message: err.message,
  locations: err.locations,
  stack: err.stack
});

const defaultExtensions = exports.defaultExtensions = [require.resolve('./extensions/cover-art-archive'), require.resolve('./extensions/fanart-tv'), require.resolve('./extensions/mediawiki'), require.resolve('./extensions/the-audio-db')];

const middleware = ({
  client = new _api2.default(),
  extensions = process.env.GRAPHBRAINZ_EXTENSIONS ? JSON.parse(process.env.GRAPHBRAINZ_EXTENSIONS) : defaultExtensions,
  ...middlewareOptions
} = {}) => {
  const options = { client, extensions, ...middlewareOptions };
  const DEV = process.env.NODE_ENV !== 'production';
  const graphiql = DEV || process.env.GRAPHBRAINZ_GRAPHIQL === 'true';
  return (0, _expressGraphql2.default)({
    schema: (0, _schema.createSchema)(_schema2.default, options),
    context: (0, _context.createContext)(options),
    pretty: DEV,
    graphiql,
    formatError: DEV ? formatError : undefined,
    ...middlewareOptions
  });
};

exports.default = middleware;
function start(options) {
  require('dotenv').config({ silent: true });
  const app = (0, _express2.default)();
  const port = process.env.PORT || 3000;
  const route = process.env.GRAPHBRAINZ_PATH || '/';
  const corsOptions = {
    origin: process.env.GRAPHBRAINZ_CORS_ORIGIN || false,
    methods: 'HEAD,GET,POST'
  };
  switch (corsOptions.origin) {
    case 'true':
      corsOptions.origin = true;
      break;
    case 'false':
      corsOptions.origin = false;
      break;
    default:
      break;
  }
  app.use((0, _compression2.default)());
  app.use(route, (0, _cors2.default)(corsOptions), middleware(options));
  app.listen(port);
  console.log(`Listening on port ${port}.`);
}

if (require.main === module) {
  start();
}