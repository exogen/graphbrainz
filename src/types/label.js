import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql/type'
import Entity from './entity'
import { IPI } from './scalars'
import Area from './area'
import {
  id,
  name,
  sortName,
  disambiguation,
  lifeSpan,
  releases,
  fieldWithID,
  createPageType
} from './helpers'

const Label = new GraphQLObjectType({
  name: 'Label',
  description: 'Labels represent mostly (but not only) imprints.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
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

export const LabelPage = createPageType(Label)
export default Label
