'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyExtension = applyExtension;
exports.createSchema = createSchema;

var _graphql = require('graphql');

var _graphqlTools = require('graphql-tools');

var _queries = require('./queries');

var _node = require('./types/node');

var _extensions = require('./extensions');

const debug = require('debug')('graphbrainz:schema');

function applyExtension(extension, schema, options = {}) {
  let outputSchema = schema;
  if (extension.extendSchema) {
    if (typeof extension.extendSchema === 'object') {
      debug(`Extending schema via an object from the “${extension.name}” extension.`);
      const { schemas = [], resolvers } = extension.extendSchema;
      outputSchema = schemas.reduce((updatedSchema, extensionSchema) => {
        if (typeof extensionSchema === 'string') {
          extensionSchema = (0, _graphql.parse)(extensionSchema);
        }
        return (0, _graphql.extendSchema)(updatedSchema, extensionSchema);
      }, outputSchema);
      if (resolvers) {
        (0, _graphqlTools.addResolveFunctionsToSchema)({ schema: outputSchema, resolvers });
      }
    } else if (typeof extension.extendSchema === 'function') {
      debug(`Extending schema via a function from the “${extension.name}” extension.`);
      outputSchema = extension.extendSchema(schema, options);
    } else {
      throw new Error(`The “${extension.name}” extension contains an invalid ` + `\`extendSchema\` value: ${extension.extendSchema}`);
    }
  }

  // Fix for `graphql-tools` creating a new Query type with no description.
  if (outputSchema._queryType.description === undefined) {
    outputSchema._queryType.description = schema._queryType.description;
  }
  return outputSchema;
}

function createSchema(schema, options = {}) {
  const { extensions = [] } = options;
  return extensions.reduce((updatedSchema, extension) => {
    return applyExtension((0, _extensions.loadExtension)(extension), updatedSchema, options);
  }, schema);
}

exports.default = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'Query',
    description: `The query root, from which multiple types of MusicBrainz
requests can be made.`,
    fields: () => ({
      lookup: _queries.lookup,
      browse: _queries.browse,
      search: _queries.search,
      node: _node.nodeField
    })
  })
});