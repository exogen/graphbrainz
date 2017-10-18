import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'

export default {
  name: 'MediaWiki',
  description:
    'Retrieve information from MediaWiki image pages, like the actual image ' +
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
