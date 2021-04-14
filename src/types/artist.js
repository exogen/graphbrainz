import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import { Area } from './area.js';
import { aliases } from './alias.js';
import { collections } from './collection.js';
import { lifeSpan } from './life-span.js';
import { recordings } from './recording.js';
import { releases } from './release.js';
import { releaseGroups } from './release-group.js';
import { works } from './work.js';
import { relationships } from './relationship.js';
import { rating } from './rating.js';
import { tags } from './tag.js';
import { IPI, ISNI } from './scalars.js';
import {
  resolveWithFallback,
  fieldWithID,
  id,
  mbid,
  name,
  sortName,
  disambiguation,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';

const { GraphQLObjectType, GraphQLString, GraphQLList } = GraphQL;

export const Artist = new GraphQLObjectType({
  name: 'Artist',
  description: `An [artist](https://musicbrainz.org/doc/Artist) is generally a
musician, group of musicians, or other music professional (like a producer or
engineer). Occasionally, it can also be a non-musical person (like a
photographer, an illustrator, or a poet whose writings are set to music), or
even a fictional character.`,
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
      description: `The country with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`,
    },
    area: {
      type: Area,
      description: `The area with which an artist is primarily identified. It
is often, but not always, its birth/formation country.`,
    },
    beginArea: {
      type: Area,
      description: `The area in which an artist began their career (or where
they were born, if the artist is a person).`,
      resolve: resolveWithFallback(['begin-area', 'begin_area']),
    },
    endArea: {
      type: Area,
      description: `The area in which an artist ended their career (or where
they died, if the artist is a person).`,
      resolve: resolveWithFallback(['end-area', 'end_area']),
    },
    lifeSpan,
    ...fieldWithID('gender', {
      description: `Whether a person or character identifies as male, female, or
neither. Groups do not have genders.`,
    }),
    ...fieldWithID('type', {
      description: 'Whether an artist is a person, a group, or something else.',
    }),
    ipis: {
      type: new GraphQLList(IPI),
      description: `List of [Interested Parties Information](https://musicbrainz.org/doc/IPI)
(IPI) codes for the artist.`,
    },
    isnis: {
      type: new GraphQLList(ISNI),
      description: `List of [International Standard Name Identifier](https://musicbrainz.org/doc/ISNI)
(ISNI) codes for the artist.`,
    },
    recordings,
    releases,
    releaseGroups,
    works,
    relationships,
    collections,
    rating,
    tags,
  }),
});

export const ArtistConnection = connectionWithExtras(Artist);

export const artists = linkedQuery(ArtistConnection);
