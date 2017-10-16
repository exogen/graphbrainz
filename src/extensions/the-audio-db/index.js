import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'

export default {
  name: 'TheAudioDB',
  description:
    'Retrieve images and information about artists, releases, and recordings ' +
    'from the TheAudioDB.com API.',
  extendContext (context, options) {
    return {
      ...context,
      loaders: {
        ...context.loaders,
        theAudioDB: createLoader(options)
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
