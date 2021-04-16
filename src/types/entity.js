import GraphQL from 'graphql';
import { mbid, connectionWithExtras, resolveType } from './helpers.js';

const { GraphQLInterfaceType } = GraphQL;

export const Entity = new GraphQLInterfaceType({
  name: 'Entity',
  description: 'An entity in the MusicBrainz schema.',
  resolveType,
  fields: () => ({ mbid }),
});

export const EntityConnection = connectionWithExtras(Entity);
