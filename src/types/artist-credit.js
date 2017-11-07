import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Artist from './artist'

export default new GraphQLObjectType({
  name: 'ArtistCredit',
  description: `[Artist credits](https://musicbrainz.org/doc/Artist_Credits)
indicate who is the main credited artist (or artists) for releases, release
groups, tracks, and recordings, and how they are credited. They consist of
artists, with (optionally) their names as credited in the specific release,
track, etc., and join phrases between them.`,
  fields: () => ({
    artist: {
      type: Artist,
      description: `The entity representing the artist referenced in the
credits.`,
      resolve: source => {
        const { artist } = source
        if (artist) {
          artist._type = 'artist'
        }
        return artist
      }
    },
    name: {
      type: GraphQLString,
      description: `The name of the artist as credited in the specific release,
track, etc.`
    },
    joinPhrase: {
      type: GraphQLString,
      description: `Join phrases might include words and/or punctuation to
separate artist names as they appear on the release, track, etc.`,
      resolve: data => data.joinphrase
    }
  })
})
