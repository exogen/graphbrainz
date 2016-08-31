import { GraphQLObjectType, GraphQLNonNull } from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { URLString } from './scalars'
import { id, mbid, relations } from './helpers'

const URL = new GraphQLObjectType({
  name: 'URL',
  description:
    'A URL pointing to a resource external to MusicBrainz, i.e. an official ' +
    'homepage, a site where music can be acquired, an entry in another ' +
    'database, etc.',
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    resource: { type: new GraphQLNonNull(URLString) },
    relations
  })
})

const { connectionType: URLConnection } = connectionDefinitions({ nodeType: URL })
export { URLConnection }
export default URL
