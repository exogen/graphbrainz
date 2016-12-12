import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import {
  fieldWithID,
  id,
  mbid,
  name,
  disambiguation,
  aliases,
  relationships,
  collections,
  tags,
  connectionWithExtras
} from './helpers'

const Instrument = new GraphQLObjectType({
  name: 'Instrument',
  description: `[Instruments](https://musicbrainz.org/doc/Instrument) are
devices created or adapted to make musical sounds. Instruments are primarily
used in relationships between two other entities.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    aliases,
    description: {
      type: GraphQLString,
      description: `A brief description of the main characteristics of the
instrument.`
    },
    ...fieldWithID('type', {
      description: `The type categorises the instrument by the way the sound is
created, similar to the [Hornbostel-Sachs](https://en.wikipedia.org/wiki/Hornbostel%E2%80%93Sachs)
classification.`
    }),
    relationships,
    collections,
    tags
  })
})

export const InstrumentConnection = connectionWithExtras(Instrument)
export default Instrument
