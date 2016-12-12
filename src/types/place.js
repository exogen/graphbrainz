import { GraphQLObjectType, GraphQLString } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import { Degrees } from './scalars'
import Area from './area'
import {
  id,
  mbid,
  name,
  disambiguation,
  aliases,
  lifeSpan,
  events,
  fieldWithID,
  relationships,
  collections,
  tags,
  connectionWithExtras
} from './helpers'

export const Coordinates = new GraphQLObjectType({
  name: 'Coordinates',
  description: 'Geographic coordinates described with latitude and longitude.',
  fields: () => ({
    latitude: {
      type: Degrees,
      description: 'The north–south position of a point on the Earth’s surface.'
    },
    longitude: {
      type: Degrees,
      description: 'The east–west position of a point on the Earth’s surface.'
    }
  })
})

const Place = new GraphQLObjectType({
  name: 'Place',
  description: `A [place](https://musicbrainz.org/doc/Place) is a venue, studio,
or other place where music is performed, recorded, engineered, etc.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    aliases,
    address: {
      type: GraphQLString,
      description: `The address describes the location of the place using the
standard addressing format for the country it is located in.`
    },
    area: {
      type: Area,
      description: `The area entity representing the area, such as the city, in
which the place is located.`
    },
    coordinates: {
      type: Coordinates,
      description: 'The geographic coordinates of the place.'
    },
    lifeSpan,
    ...fieldWithID('type', {
      description: `The type categorises the place based on its primary
function.`
    }),
    events,
    relationships,
    collections,
    tags
  })
})

export const PlaceConnection = connectionWithExtras(Place)
export default Place
