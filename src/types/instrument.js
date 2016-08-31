import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import {
  fieldWithID,
  id,
  mbid,
  name,
  disambiguation
} from './helpers'

const Instrument = new GraphQLObjectType({
  name: 'Instrument',
  description:
    'Instruments are devices created or adapted to make musical sounds.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    description: { type: GraphQLString },
    ...fieldWithID('type')
  })
})

export default Instrument
