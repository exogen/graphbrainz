import { GraphQLSchema, GraphQLObjectType, extendSchema, parse } from 'graphql'
import { addResolveFunctionsToSchema } from 'graphql-tools'
import { lookup, browse, search } from './queries'
import { nodeField } from './types/node'
import { loadExtension } from './extensions'

const debug = require('debug')('graphbrainz:schema')

export function applyExtension(extension, schema, options = {}) {
  let outputSchema = schema
  if (extension.extendSchema) {
    if (typeof extension.extendSchema === 'object') {
      debug(
        `Extending schema via an object from the “${extension.name}” extension.`
      )
      const { schemas = [], resolvers } = extension.extendSchema
      outputSchema = schemas.reduce((updatedSchema, extensionSchema) => {
        if (typeof extensionSchema === 'string') {
          extensionSchema = parse(extensionSchema)
        }
        return extendSchema(updatedSchema, extensionSchema)
      }, outputSchema)
      if (resolvers) {
        addResolveFunctionsToSchema({ schema: outputSchema, resolvers })
      }
    } else if (typeof extension.extendSchema === 'function') {
      debug(
        `Extending schema via a function from the “${
          extension.name
        }” extension.`
      )
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

export function createSchema(schema, options = {}) {
  const { extensions = [] } = options
  return extensions.reduce((updatedSchema, extension) => {
    return applyExtension(loadExtension(extension), updatedSchema, options)
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
