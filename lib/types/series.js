'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeriesConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Series = new _type.GraphQLObjectType({
  name: 'Series',
  description: `A [series](https://musicbrainz.org/doc/Series) is a sequence of
separate release groups, releases, recordings, works or events with a common
theme.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    disambiguation: _helpers.disambiguation,
    ...(0, _helpers.fieldWithID)('type', {
      description: `The type primarily describes what type of entity the series
contains.`
    }),
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    tags: _helpers.tags
  })
});

const SeriesConnection = exports.SeriesConnection = (0, _helpers.connectionWithExtras)(Series);
exports.default = Series;