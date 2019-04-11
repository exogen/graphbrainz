'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Event = new _type.GraphQLObjectType({
  name: 'Event',
  description: `An [event](https://musicbrainz.org/doc/Event) refers to an
organised event which people can attend, and is relevant to MusicBrainz.
Generally this means live performances, like concerts and festivals.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    lifeSpan: _helpers.lifeSpan,
    time: {
      type: _scalars.Time,
      description: 'The start time of the event.'
    },
    cancelled: {
      type: _type.GraphQLBoolean,
      description: 'Whether or not the event took place.'
    },
    setlist: {
      type: _type.GraphQLString,
      description: `A list of songs performed, optionally including links to
artists and works. See the [setlist documentation](https://musicbrainz.org/doc/Event/Setlist)
for syntax and examples.`
    },
    ...(0, _helpers.fieldWithID)('type', {
      description: 'What kind of event the event is, e.g. concert, festival, etc.'
    }),
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    rating: _helpers.rating,
    tags: _helpers.tags
  })
});

const EventConnection = exports.EventConnection = (0, _helpers.connectionWithExtras)(Event);
exports.default = Event;