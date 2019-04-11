'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('graphql/type');

exports.default = new _type.GraphQLObjectType({
  name: 'Rating',
  description: `[Ratings](https://musicbrainz.org/doc/Rating_System) allow users
to rate MusicBrainz entities. User may assign a value between 1 and 5; these
values are then aggregated by the server to compute an average community rating
for the entity.`,
  fields: () => ({
    voteCount: {
      type: new _type.GraphQLNonNull(_type.GraphQLInt),
      description: 'The number of votes that have contributed to the rating.',
      resolve: rating => rating['votes-count']
    },
    value: {
      type: _type.GraphQLFloat,
      description: 'The average rating value based on the aggregated votes.'
    }
  })
});