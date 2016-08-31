import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { IPI } from './scalars'
import Area from './area'
import {
  id,
  mbid,
  name,
  sortName,
  disambiguation,
  lifeSpan,
  releases,
  fieldWithID
} from './helpers'

const Label = new GraphQLObjectType({
  name: 'Label',
  description: 'Labels represent mostly (but not only) imprints.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    sortName,
    disambiguation,
    country: { type: GraphQLString },
    area: { type: Area },
    lifeSpan,
    labelCode: { type: GraphQLInt },
    ipis: { type: new GraphQLList(IPI) },
    ...fieldWithID('type'),
    releases
  })
})

const { connectionType: LabelConnection } = connectionDefinitions({ nodeType: Label })
export { LabelConnection }
export default Label
