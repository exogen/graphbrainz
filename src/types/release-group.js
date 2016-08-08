import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql/type'
import MBID from './mbid'
import DateType from './date'
import ArtistCreditType from './artist-credit'
import ReleaseType from './release'
import { getHyphenated, fieldWithID, getByline } from './helpers'

export default new GraphQLObjectType({
  name: 'ReleaseGroup',
  description:
    'Represents an abstract "album" (or "single", or "EP") entity. ' +
    'Technically it’s a group of releases, with a specified type.',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) },
    title: { type: GraphQLString },
    disambiguation: { type: GraphQLString },
    firstReleaseDate: { type: DateType, resolve: getHyphenated },
    ...fieldWithID('primaryType'),
    ...fieldWithID('secondaryTypes', { type: new GraphQLList(GraphQLString) }),
    artists: {
      type: new GraphQLList(ArtistCreditType),
      resolve: data => data['artist-credit']
    },
    artistByline: { type: GraphQLString, resolve: getByline },
    releases: {
      type: new GraphQLList(ReleaseType),
      args: {
        type: { type: GraphQLString },
        status: { type: GraphQLString }
      }
    }
  })
})
