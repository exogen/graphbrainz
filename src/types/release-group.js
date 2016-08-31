import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { DateType } from './scalars'
import {
  id,
  mbid,
  title,
  disambiguation,
  artistCredit,
  artists,
  releases,
  relations,
  getHyphenated,
  fieldWithID
} from './helpers'

const ReleaseGroup = new GraphQLObjectType({
  name: 'ReleaseGroup',
  description:
    'Represents an abstract "album" (or "single", or "EP") entity. ' +
    'Technically it’s a group of releases, with a specified type.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    artistCredit,
    firstReleaseDate: { type: DateType, resolve: getHyphenated },
    ...fieldWithID('primaryType'),
    ...fieldWithID('secondaryTypes', { type: new GraphQLList(GraphQLString) }),
    artists,
    releases,
    relations
  })
})

const { connectionType: ReleaseGroupConnection } = connectionDefinitions({ nodeType: ReleaseGroup })
export { ReleaseGroupConnection }
export default ReleaseGroup
