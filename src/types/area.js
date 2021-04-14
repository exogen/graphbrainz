import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
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
import { events } from './event.js';
import { aliases } from './alias.js';
import { artists } from './artist.js';
import { labels } from './label.js';
import { places } from './place.js';
import { releases } from './release.js';
import { relationships } from './relationship.js';
import { collections } from './collection.js';
import { tags } from './tag.js';

const { GraphQLObjectType, GraphQLString, GraphQLList } = GraphQL;

export const Area = new GraphQLObjectType({
  name: 'Area',
  description: `[Areas](https://musicbrainz.org/doc/Area) are geographic regions
or settlements (countries, cities, or the like).`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    sortName,
    disambiguation,
    aliases,
    isoCodes: {
      type: new GraphQLList(GraphQLString),
      description: `[ISO 3166 codes](https://en.wikipedia.org/wiki/ISO_3166) are
the codes assigned by ISO to countries and subdivisions.`,
      args: {
        standard: {
          type: GraphQLString,
          description: `Specify the particular ISO standard codes to retrieve.
Available ISO standards are 3166-1, 3166-2, and 3166-3.`,
          defaultValue: '3166-1',
        },
      },
      resolve: (data, args) => {
        const { standard = '3166-1' } = args;
        return data[`iso-${standard}-codes`];
      },
    },
    ...fieldWithID('type', {
      description: `The type of area (country, city, etc. – see the [possible
values](https://musicbrainz.org/doc/Area)).`,
    }),
    artists,
    events,
    labels,
    places,
    releases,
    relationships,
    collections,
    tags,
  }),
});

export const AreaConnection = connectionWithExtras(Area);

export const areas = linkedQuery(AreaConnection);
