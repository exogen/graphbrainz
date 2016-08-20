import { GraphQLObjectType, GraphQLNonNull } from 'graphql/type'
import Entity from './entity'
import { URLString } from './scalars'
import { id, relations, createPageType } from './helpers'

const URL = new GraphQLObjectType({
  name: 'URL',
  description:
    'A URL pointing to a resource external to MusicBrainz, i.e. an official ' +
    'homepage, a site where music can be acquired, an entry in another ' +
    'database, etc.',
  interfaces: () => [Entity],
  fields: () => ({
    id,
    resource: { type: new GraphQLNonNull(URLString) },
    relations
  })
})

export const URLPage = createPageType(URL)
export default URL
