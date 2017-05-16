import express from 'express'
import graphqlHTTP from 'express-graphql'
import compression from 'compression'
import MusicBrainz, { CoverArtArchive } from './api'
import schema from './schema'
import createLoaders from './loaders'

const formatError = (err) => ({
  message: err.message,
  locations: err.locations,
  stack: err.stack
})

const middleware = ({
  client = new MusicBrainz(),
  coverArtClient = new CoverArtArchive(),
  ...options
} = {}) => {
  const DEV = process.env.NODE_ENV !== 'production'
  const graphiql = DEV || process.env.GRAPHBRAINZ_GRAPHIQL === 'true'
  const loaders = createLoaders(client, coverArtClient)
  return graphqlHTTP({
    schema,
    context: { client, coverArtClient, loaders },
    pretty: DEV,
    graphiql,
    formatError: DEV ? formatError : undefined,
    ...options
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
