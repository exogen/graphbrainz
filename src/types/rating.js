import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat
} from 'graphql/type'

export default new GraphQLObjectType({
  name: 'Rating',
  description: `[Ratings](https://musicbrainz.org/doc/Rating_System) allow users
to rate MusicBrainz entities. User may assign a value between 1 and 5; these
values are then aggregated by the server to compute an average community rating
for the entity.`,
  fields: () => ({
    voteCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of votes that have contributed to the rating.',
      resolve: rating => rating['votes-count']
    },
    value: {
      type: GraphQLFloat,
      description: 'The average rating value based on the aggregated votes.'
    }
  })
})
