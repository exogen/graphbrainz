'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaConnection = undefined;

var _graphql = require('graphql');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Area = new _graphql.GraphQLObjectType({
  name: 'Area',
  description: `[Areas](https://musicbrainz.org/doc/Area) are geographic regions
or settlements (countries, cities, or the like).`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    sortName: _helpers.sortName,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    isoCodes: {
      type: new _graphql.GraphQLList(_graphql.GraphQLString),
      description: `[ISO 3166 codes](https://en.wikipedia.org/wiki/ISO_3166) are
the codes assigned by ISO to countries and subdivisions.`,
      args: {
        standard: {
          type: _graphql.GraphQLString,
          description: `Specify the particular ISO standard codes to retrieve.
Available ISO standards are 3166-1, 3166-2, and 3166-3.`,
          defaultValue: '3166-1'
        }
      },
      resolve: (data, args) => {
        const { standard = '3166-1' } = args;
        return data[`iso-${standard}-codes`];
      }
    },
    ...(0, _helpers.fieldWithID)('type', {
      description: `The type of area (country, city, etc. – see the [possible
values](https://musicbrainz.org/doc/Area)).`
    }),
    artists: _helpers.artists,
    events: _helpers.events,
    labels: _helpers.labels,
    places: _helpers.places,
    releases: _helpers.releases,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    tags: _helpers.tags
  })
});

const AreaConnection = exports.AreaConnection = (0, _helpers.connectionWithExtras)(Area);
exports.default = Area;