import { GraphQLObjectType, GraphQLBoolean } from 'graphql/type'
import { Locale } from './scalars'
import { name, sortName, fieldWithID } from './helpers'

export default new GraphQLObjectType({
  name: 'Alias',
  description: `[Aliases](https://musicbrainz.org/doc/Aliases) are variant names
that are mostly used as search help: if a search matches an entity’s alias, the
entity will be given as a result – even if the actual name wouldn’t be.`,
  fields: () => ({
    name: {
      ...name,
      description: 'The aliased name of the entity.'
    },
    sortName,
    locale: {
      type: Locale,
      description: `The locale (language and/or country) in which the alias is
used.`
    },
    primary: {
      type: GraphQLBoolean,
      description: `Whether this is the main alias for the entity in the
specified locale (this could mean the most recent or the most common).`
    },
    ...fieldWithID('type', {
      description: `The type or purpose of the alias – whether it is a variant,
search hint, etc.`
    })
  })
})
