import { GraphQLObjectType, GraphQLBoolean } from 'graphql/type'
import DateType from './date'

export default new GraphQLObjectType({
  name: 'LifeSpan',
  description:
    'Begin and end date of an entity that may have a finite lifetime.',
  fields: () => ({
    begin: { type: DateType },
    end: { type: DateType },
    ended: { type: GraphQLBoolean }
  })
})
