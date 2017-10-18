import { GraphQLSchema, GraphQLObjectType, parse } from 'graphql'
import { mergeSchemas } from '@exogen/graphql-tools'
import { lookup, browse, search } from './queries'
import { nodeField } from './types/node'

const debug = require('debug')('graphbrainz:schema')

export function extendSchema (extension, schema, options = {}) {
  let outputSchema = schema
  if (extension.extendSchema) {
    if (typeof extension.extendSchema === 'object') {
      debug(`Extending schema via an object from the “${extension.name}” extension.`)
      outputSchema = mergeSchemas({
        ...extension.extendSchema,
        schemas: [schema, ...extension.extendSchema.schemas]
      })
    } else if (typeof extension.extendSchema === 'function') {
      debug(`Extending schema via a function from the “${extension.name}” extension.`)
      outputSchema = extension.extendSchema(schema, options)
    } else {
      throw new Error(
        `The “${extension.name}” extension contains an invalid ` +
        `\`extendSchema\` value: ${extension.extendSchema}`
      )
    }
  }

  // Fix for `graphql-tools` creating a new Query type with no description.
  if (outputSchema._queryType.description === undefined) {
    outputSchema._queryType.description = schema._queryType.description
  }
  return outputSchema
}

export function createSchema (schema, options = {}) {
  const extensions = options.extensions || []
  return extensions.reduce((schema, extension) => {
    return extendSchema(extension, schema, options)
  }, schema)
}

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: `The query root, from which multiple types of MusicBrainz
requests can be made.`,
    fields: () => ({
      lookup,
      browse,
      search,
      node: nodeField
    })
  })
})
