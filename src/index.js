import express from 'express'
import graphqlHTTP from 'express-graphql'
import compression from 'compression'
import MusicBrainz from './api'
import schema from './schema'
import createLoaders from './loaders'

const formatError = (err) => ({
  message: err.message,
  locations: err.locations,
  stack: err.stack
})

const middleware = ({ client = new MusicBrainz(), ...options } = {}) => {
  const DEV = process.env.NODE_ENV !== 'production'
  const loaders = createLoaders(client)
  return graphqlHTTP({
    schema,
    context: { client, loaders },
    pretty: DEV,
    graphiql: DEV,
    formatError: DEV ? formatError : undefined,
    ...options
  })
}

export default middleware

if (require.main === module) {
  require('dotenv').config({ silent: true })
  const app = express()
  const port = process.env.PORT || 3000
  const route = process.env.GRAPHBRAINZ_PATH || '/'
  app.use(compression())
  app.use(route, middleware())
  app.listen(port)
}
