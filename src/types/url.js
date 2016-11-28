import { GraphQLObjectType, GraphQLNonNull } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import { URLString } from './scalars'
import { id, mbid, relationships, connectionWithExtras } from './helpers'

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

export const URLConnection = connectionWithExtras(URL)
export default URL
