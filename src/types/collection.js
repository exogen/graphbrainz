import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import {
  id,
  mbid,
  name,
  areas,
  artists,
  events,
  instruments,
  labels,
  places,
  recordings,
  releases,
  releaseGroups,
  series,
  works,
  fieldWithID,
  resolveHyphenated,
  createCollectionField,
  connectionWithExtras
} from './helpers'

const Collection = new GraphQLObjectType({
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
      description: 'The username of the editor who created the collection.'
    },
    entityType: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The type of entity listed in the collection.',
      resolve: resolveHyphenated
    },
    ...fieldWithID('type', {
      description: 'The type of collection.'
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
    works: createCollectionField(works)
  })
})

export const CollectionConnection = connectionWithExtras(Collection)
export default Collection
