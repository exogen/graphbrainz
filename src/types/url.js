import { GraphQLObjectType, GraphQLNonNull } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { URLString } from './scalars'
import { id, mbid, relationships } from './helpers'

const URL = new GraphQLObjectType({
  name: 'URL',
  description: `A [URL](https://musicbrainz.org/doc/URL) pointing to a resource
external to MusicBrainz, i.e. an official homepage, a site where music can be
acquired, an entry in another database, etc.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    resource: {
      type: new GraphQLNonNull(URLString),
      description: 'The actual URL string.'
    },
    relationships
  })
})

const { connectionType: URLConnection } = connectionDefinitions({ nodeType: URL })
export { URLConnection }
export default URL
