import { GraphQLObjectType, GraphQLInt, GraphQLBoolean } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import {
  id,
  mbid,
  title,
  disambiguation,
  artistCredit,
  artists,
  releases,
  relations
} from './helpers'

const Recording = new GraphQLObjectType({
  name: 'Recording',
  description:
    'Represents a unique mix or edit. Has title, artist credit, duration, ' +
    'list of PUIDs and ISRCs.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
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

const { connectionType: RecordingConnection } = connectionDefinitions({ nodeType: Recording })
export { RecordingConnection }
export default Recording
