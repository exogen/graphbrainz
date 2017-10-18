import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'

export default {
  name: 'Cover Art Archive',
  description:
    'Retrieve cover art images for releases from the [Cover Art Archive](https://coverartarchive.org/).',
  extendContext (context, options) {
    return {
      ...context,
      loaders: {
        ...context.loaders,
        coverArtArchive: createLoader(options)
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
