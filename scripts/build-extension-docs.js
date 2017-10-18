import fs from 'fs'
import path from 'path'
import { graphql, introspectionQuery } from 'graphql'
import { renderSchema, diffSchema } from 'graphql-markdown'
import baseSchema, { createSchema } from '../src/schema'

const extensionModules = [
  'cover-art-archive',
  'fanart-tv',
  'mediawiki',
  'the-audio-db'
]

function getSchemaJSON (schema) {
  return graphql(schema, introspectionQuery).then(result => result.data)
}

Promise.all(extensionModules.map(extensionModule => {
  const extension = require(`../src/extensions/${extensionModule}`).default
  console.log(`Generating docs for “${extension.name}” extension...`)
  const schema = createSchema(baseSchema, { extensions: [extension] })
  return Promise.all([
    getSchemaJSON(baseSchema),
    getSchemaJSON(schema)
  ]).then(([baseSchemaJSON, schemaJSON]) => {
    const outputSchema = diffSchema(baseSchemaJSON, schemaJSON, {
      processTypeDiff (type) {
        if (type.description === undefined) {
          type.description =
            ':small_blue_diamond: *This type has been extended. See the ' +
            '[base schema](../types.md)\nfor a description and additional ' +
            'fields.*'
        }
        return type
      }
    })
    const outputPath = path.resolve(
      __dirname,
      `../docs/extensions/${extensionModule}.md`
    )
    const stream = fs.createWriteStream(outputPath)
    const printer = (line) => stream.write(`${line}\n`)
    renderSchema(outputSchema, {
      title: `Extension: ${extension.name}`,
      prologue: extension.description,
      printer,
      unknownTypeURL: '../types.md'
    })
    stream.end()
    return new Promise((resolve, reject) => {
      stream.on('error', reject)
      stream.on('finish', () => resolve(extension))
    })
  })
})).then((extensions) => {
  console.log(`Built docs for ${extensions.length} extension(s).`)
}).catch(err => {
  console.log('Error:', err)
})
