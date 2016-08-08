import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql/type'
import MBID from './mbid'
import DateType from './date'
import ArtistCreditType from './artist-credit'
import ReleaseEventType from './release-event'
import { getHyphenated, fieldWithID, getByline } from './helpers'

export default new GraphQLObjectType({
  name: 'Release',
  description:
    'Real-world release object you can buy in your music store. It has ' +
    'release date and country, list of catalog number and label pairs, ' +
    'packaging type and release status.',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) },
    title: { type: GraphQLString },
    artists: {
      type: new GraphQLList(ArtistCreditType),
      resolve: data => data['artist-credit']
    },
    artistByline: { type: GraphQLString, resolve: getByline },
    releaseEvents: {
      type: new GraphQLList(ReleaseEventType),
      resolve: getHyphenated
    },
    disambiguation: { type: GraphQLString },
    date: { type: DateType },
    country: { type: GraphQLString },
    barcode: { type: GraphQLString },
    ...fieldWithID('status'),
    ...fieldWithID('packaging'),
    quality: { type: GraphQLString }
  })
})
