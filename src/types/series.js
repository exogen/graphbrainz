import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import {
  id,
  mbid,
  name,
  disambiguation,
  fieldWithID,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';
import { collections } from './collection.js';
import { relationships } from './relationship.js';
import { tags } from './tag.js';

const { GraphQLObjectType } = GraphQL;

export const Series = new GraphQLObjectType({
  name: 'Series',
  description: `A [series](https://musicbrainz.org/doc/Series) is a sequence of
separate release groups, releases, recordings, works or events with a common
theme.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    disambiguation,
    ...fieldWithID('type', {
      description: `The type primarily describes what type of entity the series
contains.`,
    }),
    relationships,
    collections,
    tags,
  }),
});

export const SeriesConnection = connectionWithExtras(Series);

export const series = linkedQuery(SeriesConnection);
