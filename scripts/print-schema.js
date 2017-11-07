import { graphql, introspectionQuery, printSchema } from 'graphql'
import schema from '../src/schema'

if (process.argv[2] === '--json') {
  graphql(schema, introspectionQuery)
    .then(result => {
      console.log(JSON.stringify(result, null, 2))
    })
    .catch(err => {
      console.error(err)
    })
} else {
  console.log(printSchema(schema))
}
