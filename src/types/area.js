import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import Node from './node'
import Entity from './entity'
import {
  id,
  mbid,
  name,
  sortName,
  disambiguation,
  aliases,
  artists,
  events,
  labels,
  places,
  releases,
  relationships,
  tags,
  connectionWithExtras
} from './helpers'

const Area = new GraphQLObjectType({
  name: 'Area',
  description: `[Areas](https://musicbrainz.org/doc/Area) are geographic regions
or settlements (countries, cities, or the like).`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    sortName,
    disambiguation,
    aliases,
    isoCodes: {
      type: new GraphQLList(GraphQLString),
      description: `[ISO 3166 codes](https://en.wikipedia.org/wiki/ISO_3166) are
the codes assigned by ISO to countries and subdivisions.`,
      resolve: data => data['iso-3166-1-codes']
    },
    artists,
    events,
    labels,
    places,
    releases,
    relationships,
    tags
  })
})

export const AreaConnection = connectionWithExtras(Area)
export default Area
