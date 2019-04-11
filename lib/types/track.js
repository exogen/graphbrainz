'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('graphql/type');

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _scalars = require('./scalars');

var _recording = require('./recording');

var _recording2 = _interopRequireDefault(_recording);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _type.GraphQLObjectType({
  name: 'Track',
  description: `A track is the way a recording is represented on a particular
  release (or, more exactly, on a particular medium). Every track has a title
  (see the guidelines for titles) and is credited to one or more artists.`,
  interfaces: () => [_entity2.default],
  fields: () => ({
    mbid: _helpers.mbid,
    title: _helpers.title,
    position: {
      type: _type.GraphQLInt,
      description: `The track’s position on the overall release (including all
tracks from all discs).`
    },
    number: {
      type: _type.GraphQLString,
      description: `The track number, which may include information about the
disc or side it appears on, e.g. “A1” or “B3”.`
    },
    length: {
      type: _scalars.Duration,
      description: 'The length of the track.'
    },
    recording: {
      type: _recording2.default,
      description: 'The recording that appears on the track.',
      resolve: source => {
        const { recording } = source;
        if (recording) {
          recording._type = 'recording';
        }
        return recording;
      }
    }
  })
});