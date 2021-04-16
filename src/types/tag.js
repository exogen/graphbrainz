import GraphQL from 'graphql';
import GraphQLRelay from 'graphql-relay';
import { connectionWithExtras, linkedQuery } from './helpers.js';
import { createSubqueryResolver } from '../resolvers.js';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = GraphQL;
const { connectionFromArray } = GraphQLRelay;

export const Tag = new GraphQLObjectType({
  name: 'Tag',
  description: `[Tags](https://musicbrainz.org/tags) are a way to mark entities
with extra information – for example, the genres that apply to an artist,
release, or recording.`,
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The tag label.',
    },
    count: {
      type: GraphQLInt,
      description: 'How many times this tag has been applied to the entity.',
    },
  }),
});

export const TagConnection = connectionWithExtras(Tag);

export const tags = linkedQuery(TagConnection, {
  resolve: createSubqueryResolver({}, (value = [], args) => {
    const connection = connectionFromArray(value, args);
    return {
      nodes: connection.edges.map((edge) => edge.node),
      totalCount: value.length,
      ...connection,
    };
  }),
});
