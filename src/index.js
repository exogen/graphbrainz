import express from 'express'
import graphqlHTTP from 'express-graphql'
import compression from 'compression'
import cors from 'cors'
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
      './extensions/mediawiki',
      './extensions/the-audio-db'
    ],
  ...middlewareOptions
} = {}) => {
  debug(`Loading ${extensions.length} extension(s).`)
  const options = {
    client,
    extensions: extensions.map(extensionModule => {
      if (typeof extensionModule === 'object') {
        return extensionModule
      }
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

export function start (options) {
  require('dotenv').config({ silent: true })
  const app = express()
  const port = process.env.PORT || 3000
  const route = process.env.GRAPHBRAINZ_PATH || '/'
  const corsOptions = {
    origin: process.env.GRAPHBRAINZ_CORS_ORIGIN || false,
    methods: 'HEAD,GET,POST'
  }
  switch (corsOptions.origin) {
    case 'true':
      corsOptions.origin = true
      break
    case 'false':
      corsOptions.origin = false
      break
    default:
      break
  }
  app.use(compression())
  app.use(route, cors(corsOptions), middleware(options))
  app.listen(port)
  console.log(`Listening on port ${port}.`)
}

if (require.main === module) {
  start()
}
