import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import Entity from './entity'
import { DateType } from './scalars'
import {
  id,
  title,
  disambiguation,
  artistCredit,
  artists,
  releases,
  relations,
  getHyphenated,
  fieldWithID,
  createPageType
} from './helpers'

const ReleaseGroup = new GraphQLObjectType({
  name: 'ReleaseGroup',
  description:
    'Represents an abstract "album" (or "single", or "EP") entity. ' +
    'Technically it’s a group of releases, with a specified type.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
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

export const ReleaseGroupPage = createPageType(ReleaseGroup)
export default ReleaseGroup
