import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull } from 'graphql'
import MBID from './types/mbid'
import ArtistType from './types/artist'
import WorkType from './types/work'
import RecordingType from './types/recording'
import ReleaseGroupType from './types/release-group'
import ReleaseType from './types/release'
import PlaceType from './types/place'
import { getFields } from './util'
import { entityLoader } from './loaders'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      artist: {
        type: ArtistType,
        args: { id: { type: new GraphQLNonNull(MBID) } },
        resolve (root, { id }, context, info) {
          const include = []
          const params = { inc: include }
          let releaseType
          let releaseGroupType
          const fields = getFields(info)
          if (fields.aliases) {
            include.push('aliases')
          }
          if (fields.works) {
            include.push('works')
          }
          if (fields.recordings) {
            include.push('recordings')
          }
          if (fields.releases) {
            include.push('releases')
            fields.releases.arguments.forEach(arg => {
              if (arg.name.value === 'status' || arg.name.value === 'type') {
                params[arg.name.value] = arg.value.value
                releaseType = params.type
              }
            })
          }
          if (fields.releaseGroups) {
            include.push('release-groups')
            fields.releaseGroups.arguments.forEach(arg => {
              if (arg.name.value === 'type') {
                params[arg.name.value] = arg.value.value
                releaseGroupType = params.type
              }
            })
          }
          if (releaseType !== releaseGroupType) {
            throw new Error(
              "You tried to fetch both 'releases' and 'releaseGroups', but " +
              "specified a different 'type' value on each; they must be the " +
              'same')
          }
          return entityLoader.load(['artist', id, params])
        }
      },
      work: {
        type: WorkType,
        args: { id: { type: MBID } },
        resolve (root, { id }, context, info) {
          const include = []
          return entityLoader.load(['work', id, { inc: include }])
        }
      },
      recording: {
        type: RecordingType,
        args: { id: { type: MBID } },
        resolve (root, { id }, context, info) {
          const include = []
          const fields = getFields(info)
          if (fields.artists || fields.artistByline) {
            include.push('artists')
          }
          return entityLoader.load(['recording', id, { inc: include }])
        }
      },
      release: {
        type: ReleaseType,
        args: { id: { type: MBID } },
        resolve (root, { id }, context, info) {
          const include = []
          const fields = getFields(info)
          if (fields.artists || fields.artistByline) {
            include.push('artists')
          }
          return entityLoader.load(['release', id, { inc: include }])
        }
      },
      releaseGroup: {
        type: ReleaseGroupType,
        args: { id: { type: MBID } },
        resolve (root, { id }, context, info) {
          const include = []
          const fields = getFields(info)
          if (fields.artists || fields.artistByline) {
            include.push('artists')
          }
          if (fields.releases) {
            include.push('releases')
          }
          return entityLoader.load(['release-group', id, { inc: include }])
        }
      },
      place: {
        type: PlaceType,
        args: { id: { type: MBID } },
        resolve (root, { id }, context, info) {
          const include = []
          return entityLoader.load(['place', id, { inc: include }])
        }
      }
    })
  })
})
