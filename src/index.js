import { createRequire } from 'module'
import express from 'express'
import ExpressGraphQL from 'express-graphql'
import compression from 'compression'
import cors from 'cors'
import MusicBrainz from './api/index.js'
import { baseSchema, createSchema } from './schema.js'
import { createContext } from './context.js'
import { loadExtension } from './extensions/index.js'

const { graphqlHTTP } = ExpressGraphQL

export { loadExtension }

const formatError = err => ({
  message: err.message,
  locations: err.locations,
  stack: err.stack
})

const require = createRequire(import.meta.url)

export const defaultExtensions = [
  require.resolve('../extensions/cover-art-archive'),
  require.resolve('../extensions/fanart-tv'),
  require.resolve('../extensions/mediawiki'),
  require.resolve('../extensions/the-audio-db')
]

export function middleware({
  client = new MusicBrainz(),
  extensions = process.env.GRAPHBRAINZ_EXTENSIONS
    ? JSON.parse(process.env.GRAPHBRAINZ_EXTENSIONS)
    : defaultExtensions,
  ...middlewareOptions
} = {}) {
  const DEV = process.env.NODE_ENV !== 'production'
  const graphiql = DEV || process.env.GRAPHBRAINZ_GRAPHIQL === 'true'
  const getAsyncMiddleware = async () => {
    const loadedExtensions = await Promise.all(
      extensions.map(extensionSpecifier => loadExtension(extensionSpecifier))
    )
    const options = {
      client,
      extensions: loadedExtensions,
      ...middlewareOptions
    }
    const schema = createSchema(baseSchema, options)
    const context = createContext(options)
    return graphqlHTTP({
      schema,
      context,
      pretty: DEV,
      graphiql,
      customFormatErrorFn: DEV ? formatError : undefined,
      ...middlewareOptions
    })
  }
  const asyncMiddleware = getAsyncMiddleware()
  return async (req, res, next) => {
    try {
      const middleware = await asyncMiddleware
      middleware(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

export function start(options) {
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
