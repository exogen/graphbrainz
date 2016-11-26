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
  description: `An [event](https://musicbrainz.org/doc/Event) refers to an
organised event which people can attend, and is relevant to MusicBrainz.
Generally this means live performances, like concerts and festivals.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    lifeSpan,
    time: {
      type: Time,
      description: 'The start time of the event.'
    },
    cancelled: {
      type: GraphQLBoolean,
      description: 'Whether or not the event took place.'
    },
    setlist: {
      type: GraphQLString,
      description: `A list of songs performed, optionally including links to
artists and works. See the [setlist documentation](https://musicbrainz.org/doc/Event/Setlist)
for syntax and examples.`
    },
    ...fieldWithID('type', {
      description: 'What kind of event the event is, e.g. concert, festival, etc.'
    })
  })
})

const { connectionType: EventConnection } = connectionDefinitions({ nodeType: Event })
export { EventConnection }
export default Event
