import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { Degrees } from './scalars'
import Area from './area'
import {
  id,
  mbid,
  name,
  disambiguation,
  lifeSpan,
  events,
  fieldWithID
} from './helpers'

export const Coordinates = new GraphQLObjectType({
  name: 'Coordinates',
  description: 'Geographic coordinates with latitude and longitude.',
  fields: () => ({
    latitude: { type: Degrees },
    longitude: { type: Degrees }
  })
})

const Place = new GraphQLObjectType({
  name: 'Place',
  description:
    'A venue, studio or other place where music is performed, recorded, ' +
    'engineered, etc.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    address: { type: GraphQLString },
    area: { type: Area },
    coordinates: { type: Coordinates },
    lifeSpan,
    ...fieldWithID('type'),
    events
  })
})

const { connectionType: PlaceConnection } = connectionDefinitions({ nodeType: Place })
export { PlaceConnection }
export default Place
