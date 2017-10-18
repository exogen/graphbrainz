import schema from './schema'
import resolvers from './resolvers'
import createLoader from './loader'

export default {
  name: 'TheAudioDB',
  description:
    'Retrieve images and information about artists, releases, and recordings ' +
    'from [TheAudioDB.com](http://www.theaudiodb.com/).',
  extendContext (context, { theAudioDB = {} } = {}) {
    const { apiKey = process.env.THEAUDIODB_API_KEY } = theAudioDB
    return {
      ...context,
      loaders: {
        ...context.loaders,
        theAudioDB: createLoader({ apiKey })
      }
    }
  },
  extendSchema: {
    schemas: [schema],
    resolvers
  }
}
