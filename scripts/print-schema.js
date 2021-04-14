import GraphQL from 'graphql';
import { baseSchema as schema } from '../src/schema.js';

const { graphql, getIntrospectionQuery, printSchema } = GraphQL;

if (process.argv[2] === '--json') {
  graphql(schema, getIntrospectionQuery())
    .then((result) => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  console.log(printSchema(schema));
}
