import path from 'path';
import { fileURLToPath } from 'url';
import GraphQL from 'graphql';
import GraphQLMarkdown from 'graphql-markdown';
import { baseSchema, createSchema } from '../src/schema.js';

const { graphql, getIntrospectionQuery } = GraphQL;
const { updateSchema, diffSchema } = GraphQLMarkdown;

async function getSchemaJSON(schema) {
  const result = await graphql(schema, getIntrospectionQuery());
  return result.data;
}

async function buildExtensionDocs(extensionModules) {
  return Promise.all(
    extensionModules.map(async (extensionName) => {
      const extensionModule = await import(
        `../src/extensions/${extensionName}/index.js`
      );
      const extension = extensionModule.default;
      console.log(`Generating docs for “${extension.name}” extension...`);
      const schema = createSchema(baseSchema, { extensions: [extension] });
      const [baseSchemaJSON, schemaJSON] = await Promise.all([
        getSchemaJSON(baseSchema),
        getSchemaJSON(schema),
      ]);
      const outputSchema = diffSchema(baseSchemaJSON, schemaJSON, {
        processTypeDiff(type) {
          if (type.description === undefined) {
            type.description =
              ':small_blue_diamond: *This type has been extended. See the ' +
              '[base schema](../types.md)\nfor a description and additional ' +
              'fields.*';
          }
          return type;
        },
      });
      const outputPath = path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        `../docs/extensions/${extensionName}.md`
      );
      return updateSchema(outputPath, outputSchema, {
        unknownTypeURL: '../types.md',
        headingLevel: 2,
      });
    })
  );
}

buildExtensionDocs([
  'cover-art-archive',
  'fanart-tv',
  'mediawiki',
  'the-audio-db',
])
  .then((extensions) => {
    console.log(`Built docs for ${extensions.length} extension(s).`);
  })
  .catch((err) => {
    console.log('Error:', err);
  });
