'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URLConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const URL = new _type.GraphQLObjectType({
  name: 'URL',
  description: `A [URL](https://musicbrainz.org/doc/URL) pointing to a resource
external to MusicBrainz, i.e. an official homepage, a site where music can be
acquired, an entry in another database, etc.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    resource: {
      type: new _type.GraphQLNonNull(_scalars.URLString),
      description: 'The actual URL string.'
    },
    relationships: _helpers.relationships
  })
});

const URLConnection = exports.URLConnection = (0, _helpers.connectionWithExtras)(URL);
exports.default = URL;