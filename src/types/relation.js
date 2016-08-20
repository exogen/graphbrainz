import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql/type'
import { DateType } from './scalars'
import Entity from './entity'
import {
  getHyphenated,
  fieldWithID
} from './helpers'

const Relation = new GraphQLObjectType({
  name: 'Relation',
  fields: () => ({
    target: {
      type: new GraphQLNonNull(Entity),
      resolve: source => {
        const targetType = source['target-type']
        const target = source[targetType]
        target.entityType = targetType.replace('_', '-')
        return target
      }
    },
    direction: { type: new GraphQLNonNull(GraphQLString) },
    targetType: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: getHyphenated
    },
    sourceCredit: { type: GraphQLString, resolve: getHyphenated },
    targetCredit: { type: GraphQLString, resolve: getHyphenated },
    begin: { type: DateType },
    end: { type: DateType },
    ended: { type: GraphQLBoolean },
    attributes: { type: new GraphQLList(GraphQLString) },
    // attributeValues: {},
    ...fieldWithID('type')
  })
})

export default Relation
