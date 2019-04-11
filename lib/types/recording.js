'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordingConnection = undefined;

var _type = require('graphql/type');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Recording = new _type.GraphQLObjectType({
  name: 'Recording',
  description: `A [recording](https://musicbrainz.org/doc/Recording) is an
entity in MusicBrainz which can be linked to tracks on releases. Each track must
always be associated with a single recording, but a recording can be linked to
any number of tracks.

A recording represents distinct audio that has been used to produce at least one
released track through copying or mastering. A recording itself is never
produced solely through copying or mastering.

Generally, the audio represented by a recording corresponds to the audio at a
stage in the production process before any final mastering but after any editing
or mixing.`,
  interfaces: () => [_node2.default, _entity2.default],
  fields: () => ({
    id: _helpers.id,
    mbid: _helpers.mbid,
    title: _helpers.title,
    disambiguation: _helpers.disambiguation,
    aliases: _helpers.aliases,
    artistCredit: _helpers.artistCredit,
    artistCredits: _helpers.artistCredits,
    isrcs: {
      type: new _type.GraphQLList(_scalars.ISRC),
      description: `A list of [International Standard Recording Codes](https://musicbrainz.org/doc/ISRC)
(ISRCs) for this recording.`,
      resolve: (source, args, context) => {
        if (source.isrcs) {
          return source.isrcs;
        }
        // TODO: Add support for parent entities knowing to include this `inc`
        // parameter in their own calls by inspecting what fields are requested
        // or batching things at the loader level.
        return context.loaders.lookup.load(['recording', source.id, { inc: 'isrcs' }]).then(recording => recording.isrcs);
      }
    },
    length: {
      type: _scalars.Duration,
      description: `An approximation to the length of the recording, calculated
from the lengths of the tracks using it.`
    },
    video: {
      type: _type.GraphQLBoolean,
      description: 'Whether this is a video recording.'
    },
    artists: _helpers.artists,
    releases: _helpers.releases,
    relationships: _helpers.relationships,
    collections: _helpers.collections,
    rating: _helpers.rating,
    tags: _helpers.tags
  })
});

const RecordingConnection = exports.RecordingConnection = (0, _helpers.connectionWithExtras)(Recording);
exports.default = Recording;