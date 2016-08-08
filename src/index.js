import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'

const app = express()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  formatError: error => ({
    message: error.message,
    statusCode: error.statusCode,
    locations: error.locations,
    stack: error.stack
  })
}))

app.listen(3001)
