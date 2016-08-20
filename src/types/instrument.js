import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Entity from './entity'
import {
  fieldWithID,
  id,
  name,
  disambiguation
} from './helpers'

const Instrument = new GraphQLObjectType({
  name: 'Instrument',
  description:
    'Instruments are devices created or adapted to make musical sounds.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    name,
    disambiguation,
    description: { type: GraphQLString },
    ...fieldWithID('type')
  })
})

export default Instrument
