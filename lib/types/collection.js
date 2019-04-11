'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollectionConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Collection = new _type.GraphQLObjectType({
  name: 'Collection',
  description: `[Collections](https://musicbrainz.org/doc/Collections) are
lists of entities that users can create.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    editor: {
      type: new _type.GraphQLNonNull(_type.GraphQLString),
      description: 'The username of the editor who created the collection.'
    },
    entityType: {
      type: new _type.GraphQLNonNull(_type.GraphQLString),
      description: 'The type of entity listed in the collection.',
      resolve: _helpers.resolveHyphenated
    },
    ...(0, _helpers.fieldWithID)('type', {
      description: 'The type of collection.'
    }),
    areas: (0, _helpers.createCollectionField)(_helpers.areas),
    artists: (0, _helpers.createCollectionField)(_helpers.artists),
    events: (0, _helpers.createCollectionField)(_helpers.events),
    instruments: (0, _helpers.createCollectionField)(_helpers.instruments),
    labels: (0, _helpers.createCollectionField)(_helpers.labels),
    places: (0, _helpers.createCollectionField)(_helpers.places),
    recordings: (0, _helpers.createCollectionField)(_helpers.recordings),
    releases: (0, _helpers.createCollectionField)(_helpers.releases),
    releaseGroups: (0, _helpers.createCollectionField)(_helpers.releaseGroups),
    series: (0, _helpers.createCollectionField)(_helpers.series),
    works: (0, _helpers.createCollectionField)(_helpers.works)
  })
});

const CollectionConnection = exports.CollectionConnection = (0, _helpers.connectionWithExtras)(Collection);
exports.default = Collection;