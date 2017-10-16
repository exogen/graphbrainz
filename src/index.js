import express from 'express'
import graphqlHTTP from 'express-graphql'
import compression from 'compression'
import MusicBrainz from './api'
import schema, { createSchema } from './schema'
import { createContext } from './context'

const debug = require('debug')('graphbrainz')

const formatError = (err) => ({
  message: err.message,
  locations: err.locations,
  stack: err.stack
})

const middleware = ({
  client = new MusicBrainz(),
  extensions = process.env.GRAPHBRAINZ_EXTENSIONS
    ? JSON.parse(process.env.GRAPHBRAINZ_EXTENSIONS)
    : [
      './extensions/cover-art-archive',
      './extensions/fanart-tv',
      './extensions/the-audio-db',
      './extensions/wikimedia'
    ],
  ...middlewareOptions
} = {}) => {
  debug(`Loading ${extensions.length} extension(s).`)
  const options = {
    client,
    extensions: extensions.map(extensionModule => {
      const extension = require(extensionModule)
      return extension.default ? extension.default : extension
    }),
    ...middlewareOptions
  }
  const DEV = process.env.NODE_ENV !== 'production'
  const graphiql = DEV || process.env.GRAPHBRAINZ_GRAPHIQL === 'true'
  return graphqlHTTP({
    schema: createSchema(schema, options),
    context: createContext(options),
    pretty: DEV,
    graphiql,
    formatError: DEV ? formatError : undefined,
    ...middlewareOptions
  })
}

export default middleware

export function start () {
  require('dotenv').config({ silent: true })
  const app = express()
  const port = process.env.PORT || 3000
  const route = process.env.GRAPHBRAINZ_PATH || '/'
  app.use(compression())
  app.use(route, middleware())
  app.listen(port)
  console.log(`Listening on port ${port}.`)
}

if (require.main === module) {
  start()
}
