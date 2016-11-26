import { GraphQLObjectType } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { id, mbid, name, disambiguation, fieldWithID } from './helpers'

const Series = new GraphQLObjectType({
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
contains.`
    })
  })
})

const { connectionType: SeriesConnection } = connectionDefinitions({ nodeType: Series })
export { SeriesConnection }
export default Series
