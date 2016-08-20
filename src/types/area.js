import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import Entity from './entity'
import {
  id,
  name,
  sortName,
  disambiguation,
  artists,
  events,
  labels,
  places,
  releases,
  createPageType
} from './helpers'

const Area = new GraphQLObjectType({
  name: 'Area',
  description: 'A country, region, city or the like.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    name,
    sortName,
    disambiguation,
    isoCodes: {
      type: new GraphQLList(GraphQLString),
      resolve: data => data['iso-3166-1-codes']
    },
    artists,
    events,
    labels,
    places,
    releases
  })
})

export const AreaPage = createPageType(Area)
export default Area
