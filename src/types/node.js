import GraphQLRelay from 'graphql-relay';
import { toDashed } from '../util.js';
import { resolveType } from './helpers.js';

const { nodeDefinitions, fromGlobalId } = GraphQLRelay;

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalID, { loaders }) => {
    const { type, id } = fromGlobalId(globalID);
    const entityType = toDashed(type);
    return loaders.lookup.load([entityType, id]);
  },
  resolveType
);

export const Node = nodeInterface;
export { nodeInterface, nodeField };
