import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import Entity from './entity'
import { DateType } from './scalars'
import ReleaseEvent from './release-event'
import {
  id,
  title,
  disambiguation,
  artistCredit,
  artists,
  labels,
  recordings,
  releaseGroups,
  relations,
  getHyphenated,
  fieldWithID,
  createPageType
} from './helpers'

const Release = new GraphQLObjectType({
  name: 'Release',
  description:
    'Real-world release object you can buy in your music store. It has ' +
    'release date and country, list of catalog number and label pairs, ' +
    'packaging type and release status.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    title,
    disambiguation,
    artistCredit,
    releaseEvents: {
      type: new GraphQLList(ReleaseEvent),
      resolve: getHyphenated
    },
    date: { type: DateType },
    country: { type: GraphQLString },
    barcode: { type: GraphQLString },
    ...fieldWithID('status'),
    ...fieldWithID('packaging'),
    quality: { type: GraphQLString },
    artists,
    labels,
    recordings,
    releaseGroups,
    relations
  })
})

export const ReleasePage = createPageType(Release)
export default Release
