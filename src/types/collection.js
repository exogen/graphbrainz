import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql/type'
import Node from './node'
import Entity from './entity'
import {
  id,
  mbid,
  name,
  areas,
  artists,
  events,
  labels,
  places,
  recordings,
  releases,
  releaseGroups,
  works,
  fieldWithID,
  resolveHyphenated,
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
    areas,
    artists,
    events,
    labels,
    places,
    recordings,
    releases,
    releaseGroups,
    works
  })
})

export const CollectionConnection = connectionWithExtras(Collection)
export default Collection
