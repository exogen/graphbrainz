import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { DateType } from './scalars'
import ReleaseEvent from './release-event'
import {
  id,
  mbid,
  title,
  disambiguation,
  artistCredit,
  artists,
  labels,
  recordings,
  releaseGroups,
  relations,
  getHyphenated,
  fieldWithID
} from './helpers'

const Release = new GraphQLObjectType({
  name: 'Release',
  description:
    'Real-world release object you can buy in your music store. It has ' +
    'release date and country, list of catalog number and label pairs, ' +
    'packaging type and release status.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
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

const { connectionType: ReleaseConnection } = connectionDefinitions({ nodeType: Release })
export { ReleaseConnection }
export default Release
