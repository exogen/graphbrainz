import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import { DateType } from './scalars.js';
import { ReleaseGroupType } from './enums.js';
import {
  id,
  mbid,
  title,
  disambiguation,
  fieldWithID,
  releaseGroupType,
  resolveHyphenated,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';
import { aliases } from './alias.js';
import { artistCredit, artistCredits } from './artist-credit.js';
import { artists } from './artist.js';
import { releases } from './release.js';
import { relationships } from './relationship.js';
import { collections } from './collection.js';
import { rating } from './rating.js';
import { tags } from './tag.js';

const { GraphQLObjectType, GraphQLList } = GraphQL;

export const ReleaseGroup = new GraphQLObjectType({
  name: 'ReleaseGroup',
  description: `A [release group](https://musicbrainz.org/doc/Release_Group) is
used to group several different releases into a single logical entity. Every
release belongs to one, and only one release group.

Both release groups and releases are “albums” in a general sense, but with an
important difference: a release is something you can buy as media such as a CD
or a vinyl record, while a release group embraces the overall concept of an
album – it doesn’t matter how many CDs or editions/versions it had.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    aliases,
    artistCredit,
    artistCredits,
    firstReleaseDate: {
      type: DateType,
      description: 'The date of the earliest release in the group.',
      resolve: resolveHyphenated,
    },
    ...fieldWithID('primaryType', {
      type: ReleaseGroupType,
      description: `The [type](https://musicbrainz.org/doc/Release_Group/Type)
of a release group describes what kind of releases the release group represents,
e.g. album, single, soundtrack, compilation, etc. A release group can have a
“main” type and an unspecified number of additional types.`,
    }),
    ...fieldWithID('secondaryTypes', {
      type: new GraphQLList(ReleaseGroupType),
      description: `Additional [types](https://musicbrainz.org/doc/Release_Group/Type)
that apply to this release group.`,
    }),
    artists,
    releases,
    relationships,
    collections,
    rating,
    tags,
  }),
});

export const ReleaseGroupConnection = connectionWithExtras(ReleaseGroup);

export const releaseGroups = linkedQuery(ReleaseGroupConnection, {
  args: {
    type: releaseGroupType,
  },
});
