import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { Time } from './scalars'
import {
  fieldWithID,
  id,
  mbid,
  name,
  disambiguation,
  lifeSpan
} from './helpers'

const Event = new GraphQLObjectType({
  name: 'Event',
  description:
    'An organized event which people can attend, usually live performances ' +
    'like concerts and festivals.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    lifeSpan,
    time: { type: Time },
    cancelled: { type: GraphQLBoolean },
    setlist: { type: GraphQLString },
    ...fieldWithID('type')
  })
})

const { connectionType: EventConnection } = connectionDefinitions({ nodeType: Event })
export { EventConnection }
export default Event
