import { GraphQLObjectType } from 'graphql/type'
import { DateType } from './scalars'
import Area from './area'

export default new GraphQLObjectType({
  name: 'ReleaseEvent',
  description: `Date on which a release was released in a country/region with a
particular label, catalog number, barcode, and what release format was used.`,
  fields: () => ({
    area: { type: Area },
    date: { type: DateType }
  })
})
