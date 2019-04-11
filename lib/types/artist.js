'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtistConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _area = require('./area');

var _area2 = _interopRequireDefault(_area);

var _scalars = require('./scalars');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Artist = new _type.GraphQLObjectType({
  name: 'Artist',
  description: `An [artist](https://musicbrainz.org/doc/Artist) is generally a
musician, group of musicians, or other music professional (like a producer or
engineer). Occasionally, it can also be a non-musical person (like a
photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    name: _helpers.name,
    sortName: _helpers.sortName,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    country: {
      type: _type.GraphQLString,
      description: `The country with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`
    },
    area: {
      type: _area2.default,
      description: `The area with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`
    },
    beginArea: {
      type: _area2.default,
      description: `The area in which an artist began their career (or where
they were born, if the artist is a person).`,
      resolve: (0, _helpers.resolveWithFallback)(['begin-area', 'begin_area'])
    },
    endArea: {
      type: _area2.default,
      description: `The area in which an artist ended their career (or where
they died, if the artist is a person).`,
      resolve: (0, _helpers.resolveWithFallback)(['end-area', 'end_area'])
    },
    lifeSpan: _helpers.lifeSpan,
    ...(0, _helpers.fieldWithID)('gender', {
      description: `Whether a person or character identifies as male, female, or
neither. Groups do not have genders.`
    }),
    ...(0, _helpers.fieldWithID)('type', {
      description: 'Whether an artist is a person, a group, or something else.'
    }),
    ipis: {
      type: new _type.GraphQLList(_scalars.IPI),
      description: `List of [Interested Parties Information](https://musicbrainz.org/doc/IPI)
(IPI) codes for the artist.`
    },
    isnis: {
      type: new _type.GraphQLList(_scalars.ISNI),
      description: `List of [International Standard Name Identifier](https://musicbrainz.org/doc/ISNI)
(ISNI) codes for the artist.`
    },
    recordings: _helpers.recordings,
    releases: _helpers.releases,
    releaseGroups: _helpers.releaseGroups,
    works: _helpers.works,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    rating: _helpers.rating,
    tags: _helpers.tags
  })
});

const ArtistConnection = exports.ArtistConnection = (0, _helpers.connectionWithExtras)(Artist);
exports.default = Artist;