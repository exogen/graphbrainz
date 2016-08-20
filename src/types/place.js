import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Entity from './entity'
import { Degrees } from './scalars'
import Area from './area'
import {
  id,
  name,
  disambiguation,
  lifeSpan,
  events,
  fieldWithID,
  createPageType
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
  interfaces: () => [Entity],
  fields: () => ({
    id,
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

export const PlacePage = createPageType(Place)
export default Place
