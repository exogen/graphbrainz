import GraphQL from 'graphql';
import { Node } from './node.js';
import { Entity } from './entity.js';
import {
  id,
  mbid,
  name,
  fieldWithID,
  resolveHyphenated,
  createCollectionField,
  connectionWithExtras,
  linkedQuery,
} from './helpers.js';
import { areas } from './area.js';
import { artists } from './artist.js';
import { events } from './event.js';
import { instruments } from './instrument.js';
import { labels } from './label.js';
import { places } from './place.js';
import { recordings } from './recording.js';
import { releases } from './release.js';
import { releaseGroups } from './release-group.js';
import { series } from './series.js';
import { works } from './work.js';

const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = GraphQL;

export const Collection = new GraphQLObjectType({
  name: 'Collection',
  description: `[Collections](https://musicbrainz.org/doc/Collections) are
lists of entities that users can create.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    editor: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username of the editor who created the collection.',
    },
    entityType: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of entity listed in the collection.',
      resolve: resolveHyphenated,
    },
    ...fieldWithID('type', {
      description: 'The type of collection.',
    }),
    areas: createCollectionField(areas),
    artists: createCollectionField(artists),
    events: createCollectionField(events),
    instruments: createCollectionField(instruments),
    labels: createCollectionField(labels),
    places: createCollectionField(places),
    recordings: createCollectionField(recordings),
    releases: createCollectionField(releases),
    releaseGroups: createCollectionField(releaseGroups),
    series: createCollectionField(series),
    works: createCollectionField(works),
  }),
});

export const CollectionConnection = connectionWithExtras(Collection);

export const collections = linkedQuery(CollectionConnection, {
  description: 'A list of collections containing this entity.',
});
