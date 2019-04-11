'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Work = new _type.GraphQLObjectType({
  name: 'Work',
  description: `A [work](https://musicbrainz.org/doc/Work) is a distinct
intellectual or artistic creation, which can be expressed in the form of one or
more audio recordings.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    title: _helpers.title,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    iswcs: {
      type: new _type.GraphQLList(_type.GraphQLString),
      description: `A list of [ISWCs](https://musicbrainz.org/doc/ISWC) assigned
to the work by copyright collecting agencies.`
    },
    language: {
      type: _type.GraphQLString,
      description: 'The language in which the work was originally written.'
    },
    ...(0, _helpers.fieldWithID)('type', {
      description: 'The type of work.'
    }),
    artists: _helpers.artists,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    rating: _helpers.rating,
    tags: _helpers.tags
  })
});

const WorkConnection = exports.WorkConnection = (0, _helpers.connectionWithExtras)(Work);
exports.default = Work;