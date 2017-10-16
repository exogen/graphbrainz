import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'

export default {
  name: 'Wikimedia',
  description:
    'Retrieve information from Wikimedia image pages, like the actual image ' +
    'file URL and EXIF metadata.',
  extendContext (context, options) {
    return {
      ...context,
      loaders: {
        ...context.loaders,
        mediaWiki: createLoader(options)
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
