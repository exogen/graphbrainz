import { GraphQLObjectType } from 'graphql/type'
import { DateType } from './scalars'
import Area from './area'

export default new GraphQLObjectType({
  name: 'ReleaseEvent',
  description: `The date on which a release was issued in a country/region with
a particular label, catalog number, barcode, and format.`,
  fields: () => ({
    area: { type: Area },
    date: { type: DateType }
  })
})
