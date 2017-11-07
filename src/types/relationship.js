import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from 'graphql/type'
import { DateType } from './scalars'
import Entity from './entity'
import { resolveHyphenated, fieldWithID, connectionWithExtras } from './helpers'

const Relationship = new GraphQLObjectType({
  name: 'Relationship',
  description: `[Relationships](https://musicbrainz.org/doc/Relationships) are a
way to represent all the different ways in which entities are connected to each
other and to URLs outside MusicBrainz.`,
  fields: () => ({
    target: {
      type: new GraphQLNonNull(Entity),
      description: 'The target entity.',
      resolve: source => {
        const targetType = source['target-type']
        const target = source[targetType]
        target._type = targetType.replace('_', '-')
        return target
      }
    },
    direction: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The direction of the relationship.'
    },
    targetType: {
      type: new GraphQLNonNull(GraphQLString),
      description:
        'The type of entity on the receiving end of the relationship.',
      resolve: resolveHyphenated
    },
    sourceCredit: {
      type: GraphQLString,
      description: `How the source entity was actually credited, if different
from its main (performance) name.`,
      resolve: resolveHyphenated
    },
    targetCredit: {
      type: GraphQLString,
      description: `How the target entity was actually credited, if different
from its main (performance) name.`,
      resolve: resolveHyphenated
    },
    begin: {
      type: DateType,
      description: 'The date on which the relationship became applicable.'
    },
    end: {
      type: DateType,
      description:
        'The date on which the relationship became no longer applicable.'
    },
    ended: {
      type: GraphQLBoolean,
      description: 'Whether the relationship still applies.'
    },
    attributes: {
      type: new GraphQLList(GraphQLString),
      description: `Attributes which modify the relationship. There is a [list
of all attributes](https://musicbrainz.org/relationship-attributes), but the
attributes which are available, and how they should be used, depends on the
relationship type.`
    },
    // There doesn't seem to be any documentation for the `attribute-values`
    // field.
    // attributeValues: {},
    ...fieldWithID('type', {
      description: 'The type of relationship.'
    })
  })
})

export const RelationshipConnection = connectionWithExtras(Relationship)
export default Relationship
