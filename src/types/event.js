import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql/type'
import Entity from './entity'
import { Time } from './scalars'
import {
  fieldWithID,
  id,
  name,
  disambiguation,
  lifeSpan,
  createPageType
} from './helpers'

const Event = new GraphQLObjectType({
  name: 'Event',
  description:
    'An organized event which people can attend, usually live performances ' +
    'like concerts and festivals.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    name,
    disambiguation,
    lifeSpan,
    time: { type: Time },
    cancelled: { type: GraphQLBoolean },
    setlist: { type: GraphQLString },
    ...fieldWithID('type')
  })
})

export const EventPage = createPageType(Event)
export default Event
