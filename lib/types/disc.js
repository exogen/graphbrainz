'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('graphql/type');

var _graphqlRelay = require('graphql-relay');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _scalars = require('./scalars');

var _release = require('./release');

var _resolvers = require('../resolvers');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _type.GraphQLObjectType({
  name: 'Disc',
  description: `Information about the physical CD and releases associated with a
particular [disc ID](https://musicbrainz.org/doc/Disc_ID).`,
  interfaces: () => [_node2.default],
  fields: () => ({
    id: _helpers.id,
    discID: {
      type: new _type.GraphQLNonNull(_scalars.DiscID),
      description: `The [disc ID](https://musicbrainz.org/doc/Disc_ID) of this disc.`,
      resolve: disc => disc.id
    },
    offsetCount: {
      type: new _type.GraphQLNonNull(_type.GraphQLInt),
      description: 'The number of offsets (tracks) on the disc.',
      resolve: _helpers.resolveHyphenated
    },
    offsets: {
      type: new _type.GraphQLList(_type.GraphQLInt),
      description: 'The sector offset of each track on the disc.'
    },
    sectors: {
      type: new _type.GraphQLNonNull(_type.GraphQLInt),
      description: 'The sector offset of the lead-out (the end of the disc).'
    },
    releases: {
      type: _release.ReleaseConnection,
      description: 'The list of releases linked to this disc ID.',
      args: _graphqlRelay.forwardConnectionArgs,
      resolve: _resolvers.resolveDiscReleases
    }
  })
});