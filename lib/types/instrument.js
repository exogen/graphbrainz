'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstrumentConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Instrument = new _type.GraphQLObjectType({
  name: 'Instrument',
  description: `[Instruments](https://musicbrainz.org/doc/Instrument) are
devices created or adapted to make musical sounds. Instruments are primarily
used in relationships between two other entities.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    description: {
      type: _type.GraphQLString,
      description: `A brief description of the main characteristics of the
instrument.`
    },
    ...(0, _helpers.fieldWithID)('type', {
      description: `The type categorises the instrument by the way the sound is
created, similar to the [Hornbostel-Sachs](https://en.wikipedia.org/wiki/Hornbostel%E2%80%93Sachs)
classification.`
    }),
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    tags: _helpers.tags
  })
});

const InstrumentConnection = exports.InstrumentConnection = (0, _helpers.connectionWithExtras)(Instrument);
exports.default = Instrument;