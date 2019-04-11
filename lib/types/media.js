'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('graphql/type');

var _disc = require('./disc');

var _disc2 = _interopRequireDefault(_disc);

var _track = require('./track');

var _track2 = _interopRequireDefault(_track);

var _helpers = require('./helpers');

var _resolvers = require('../resolvers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _type.GraphQLObjectType({
  name: 'Medium',
  description: `A medium is the actual physical medium the audio content is
stored upon. This means that each CD in a multi-disc release will be entered as
separate mediums within the release, and that both sides of a vinyl record or
cassette will exist on one medium. Mediums have a format (e.g. CD, DVD, vinyl,
cassette) and can optionally also have a title.`,
  fields: () => ({
    title: {
      type: _type.GraphQLString,
      description: 'The title of this particular medium.'
    },
    ...(0, _helpers.fieldWithID)('format', {
      description: `The [format](https://musicbrainz.org/doc/Release/Format) of
the medium (e.g. CD, DVD, vinyl, cassette).`
    }),
    position: {
      type: _type.GraphQLInt,
      description: `The order of this medium in the release (for example, in a
multi-disc release).`
    },
    trackCount: {
      type: _type.GraphQLInt,
      description: 'The number of audio tracks on this medium.',
      resolve: _helpers.resolveHyphenated
    },
    discs: {
      type: new _type.GraphQLList(_disc2.default),
      description: 'A list of physical discs and their disc IDs for this medium.'
    },
    tracks: {
      type: new _type.GraphQLList(_track2.default),
      description: 'The list of tracks on the given media.',
      resolve: (0, _resolvers.createSubqueryResolver)({
        inc: 'recordings',
        key: 'tracks'
      })
    }
  })
});