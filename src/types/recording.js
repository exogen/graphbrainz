import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql/type'
import MBID from './mbid'
import ArtistCreditType from './artist-credit'
import ReleaseType from './release'
import { getByline } from './helpers'

export default new GraphQLObjectType({
  name: 'Recording',
  description:
    'Represents a unique mix or edit. Has title, artist credit, duration, ' +
    'list of PUIDs and ISRCs.',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) },
    title: { type: GraphQLString },
    disambiguation: { type: GraphQLString },
    length: { type: GraphQLInt },
    video: { type: GraphQLBoolean },
    artists: {
      type: new GraphQLList(ArtistCreditType),
      resolve: data => data['artist-credit']
    },
    artistByline: { type: GraphQLString, resolve: getByline },
    releases: { type: new GraphQLList(ReleaseType) }
  })
})
