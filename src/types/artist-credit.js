import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Artist from './artist'
import { name } from './helpers'

export default new GraphQLObjectType({
  name: 'ArtistCredit',
  description:
    'Artist, variation of artist name and piece of text to join the artist ' +
    'name to the next.',
  fields: () => ({
    artist: {
      type: Artist,
      resolve: (source) => {
        const { artist } = source
        artist.entityType = 'artist'
        return artist
      }
    },
    name,
    joinPhrase: { type: GraphQLString, resolve: data => data['joinphrase'] }
  })
})
