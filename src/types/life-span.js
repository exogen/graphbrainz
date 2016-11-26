import { GraphQLObjectType, GraphQLBoolean } from 'graphql/type'
import { DateType } from './scalars'

export default new GraphQLObjectType({
  name: 'LifeSpan',
  description: `Fields indicating the begin and end date of an entity’s
lifetime, including whether it has ended (even if the date is unknown).`,
  fields: () => ({
    begin: { type: DateType },
    end: { type: DateType },
    ended: { type: GraphQLBoolean }
  })
})
