'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlaceConnection = exports.Coordinates = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _area = require('./area');

var _area2 = _interopRequireDefault(_area);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Coordinates = exports.Coordinates = new _type.GraphQLObjectType({
  name: 'Coordinates',
  description: 'Geographic coordinates described with latitude and longitude.',
  fields: () => ({
    latitude: {
      type: _scalars.Degrees,
      description: 'The north–south position of a point on the Earth’s surface.'
    },
    longitude: {
      type: _scalars.Degrees,
      description: 'The east–west position of a point on the Earth’s surface.'
    }
  })
});

const Place = new _type.GraphQLObjectType({
  name: 'Place',
  description: `A [place](https://musicbrainz.org/doc/Place) is a venue, studio,
or other place where music is performed, recorded, engineered, etc.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    address: {
      type: _type.GraphQLString,
      description: `The address describes the location of the place using the
standard addressing format for the country it is located in.`
    },
    area: {
      type: _area2.default,
      description: `The area entity representing the area, such as the city, in
which the place is located.`
    },
    coordinates: {
      type: Coordinates,
      description: 'The geographic coordinates of the place.'
    },
    lifeSpan: _helpers.lifeSpan,
    ...(0, _helpers.fieldWithID)('type', {
      description: `The type categorises the place based on its primary
function.`
    }),
    events: _helpers.events,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    tags: _helpers.tags
  })
});

const PlaceConnection = exports.PlaceConnection = (0, _helpers.connectionWithExtras)(Place);
exports.default = Place;