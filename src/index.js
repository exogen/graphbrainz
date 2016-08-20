import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import { lookupLoader, browseLoader, searchLoader } from './loaders'

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  context: { lookupLoader, browseLoader, searchLoader },
  pretty: true,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack
  })
}))

app.get('/graphiql', (req, res) => {
  res.redirect(`/graph${req.url.slice(7)}`)
})

app.listen(process.env.PORT || 3001)
