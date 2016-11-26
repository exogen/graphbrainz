import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import {
  id,
  mbid,
  title,
  disambiguation,
  artists,
  relationships,
  fieldWithID
} from './helpers'

const Work = new GraphQLObjectType({
  name: 'Work',
  description: `A [work](https://musicbrainz.org/doc/Work) is a distinct
intellectual or artistic creation, which can be expressed in the form of one or
more audio recordings.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    iswcs: {
      type: new GraphQLList(GraphQLString),
      description: `A list of [ISWCs](https://musicbrainz.org/doc/ISWC) assigned
to the work by copyright collecting agencies.`
    },
    language: {
      type: GraphQLString,
      description: 'The language in which the work was originally written.'
    },
    ...fieldWithID('type', {
      description: 'The type of work.'
    }),
    artists,
    relationships
  })
})

const { connectionType: WorkConnection } = connectionDefinitions({ nodeType: Work })
export { WorkConnection }
export default Work
