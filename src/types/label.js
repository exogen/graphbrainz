import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import { IPI } from './scalars.js';
import { Area } from './area.js';
import {
  id,
  mbid,
  name,
  sortName,
  disambiguation,
  fieldWithID,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';
import { aliases } from './alias.js';
import { collections } from './collection.js';
import { lifeSpan } from './life-span.js';
import { tags } from './tag.js';
import { rating } from './rating.js';
import { relationships } from './relationship.js';
import { releases } from './release.js';

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = GraphQL;

export const Label = new GraphQLObjectType({
  name: 'Label',
  description: `[Labels](https://musicbrainz.org/doc/Label) represent mostly
(but not only) imprints. To a lesser extent, a label entity may be created to
represent a record company.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    sortName,
    disambiguation,
    aliases,
    country: {
      type: GraphQLString,
      description: 'The country of origin for the label.',
    },
    area: {
      type: Area,
      description: 'The area in which the label is based.',
    },
    lifeSpan,
    labelCode: {
      type: GraphQLInt,
      description: `The [“LC” code](https://musicbrainz.org/doc/Label/Label_Code)
of the label.`,
    },
    ipis: {
      type: new GraphQLList(IPI),
      description: `List of [Interested Parties Information](https://musicbrainz.org/doc/IPI)
codes for the label.`,
    },
    ...fieldWithID('type', {
      description: `A type describing the main activity of the label, e.g.
imprint, production, distributor, rights society, etc.`,
    }),
    releases,
    relationships,
    collections,
    rating,
    tags,
  }),
});

export const LabelConnection = connectionWithExtras(Label);

export const labels = linkedQuery(LabelConnection);
