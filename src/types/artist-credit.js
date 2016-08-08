import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import ArtistType from './artist'

export default new GraphQLObjectType({
  name: 'ArtistCredit',
  description:
    'Artist, variation of artist name and piece of text to join the artist ' +
    'name to the next.',
  fields: () => ({
    artist: { type: ArtistType },
    name: { type: GraphQLString },
    joinPhrase: { type: GraphQLString, resolve: data => data['joinphrase'] }
  })
})
