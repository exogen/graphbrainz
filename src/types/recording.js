import { GraphQLObjectType, GraphQLInt, GraphQLBoolean } from 'graphql/type'
import Entity from './entity'
import {
  id,
  title,
  disambiguation,
  artistCredit,
  artists,
  releases,
  relations,
  createPageType
} from './helpers'

const Recording = new GraphQLObjectType({
  name: 'Recording',
  description:
    'Represents a unique mix or edit. Has title, artist credit, duration, ' +
    'list of PUIDs and ISRCs.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    title,
    disambiguation,
    artistCredit,
    length: { type: GraphQLInt },
    video: { type: GraphQLBoolean },
    artists,
    releases,
    relations
  })
})

export const RecordingPage = createPageType(Recording)
export default Recording
