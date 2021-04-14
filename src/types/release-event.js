import GraphQL from 'graphql';
import { DateType } from './scalars.js';
import { Area } from './area.js';

const { GraphQLObjectType } = GraphQL;

export const ReleaseEvent = new GraphQLObjectType({
  name: 'ReleaseEvent',
  description: `The date on which a release was issued in a country/region with
a particular label, catalog number, barcode, and format.`,
  fields: () => ({
    area: { type: Area },
    date: { type: DateType },
  }),
});
