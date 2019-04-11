'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagConnection = undefined;

var _type = require('graphql/type');

var _helpers = require('./helpers');

const Tag = new _type.GraphQLObjectType({
  name: 'Tag',
  description: `[Tags](https://musicbrainz.org/tags) are a way to mark entities
with extra information – for example, the genres that apply to an artist,
release, or recording.`,
  fields: () => ({
    name: {
      type: new _type.GraphQLNonNull(_type.GraphQLString),
      description: 'The tag label.'
    },
    count: {
      type: _type.GraphQLInt,
      description: 'How many times this tag has been applied to the entity.'
    }
  })
});

const TagConnection = exports.TagConnection = (0, _helpers.connectionWithExtras)(Tag);
exports.default = Tag;