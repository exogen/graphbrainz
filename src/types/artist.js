import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql/type'
import MBID from './mbid'
import AliasType from './alias'
import AreaType from './area'
import LifeSpanType from './life-span'
import WorkType from './work'
import RecordingType from './recording'
import ReleaseType from './release'
import ReleaseGroupType from './release-group'
import { getHyphenated, getUnderscored, fieldWithID } from './helpers'

export default new GraphQLObjectType({
  name: 'Artist',
  description:
    'An artist is generally a musician, a group of musicians, or another ' +
    'music professional (composer, engineer, illustrator, producer, etc.)',
  fields: () => ({
    id: { type: new GraphQLNonNull(MBID) },
    name: { type: GraphQLString },
    sortName: { type: GraphQLString, resolve: getHyphenated },
    aliases: { type: new GraphQLList(AliasType) },
    disambiguation: { type: GraphQLString },
    country: { type: GraphQLString },
    area: { type: AreaType },
    beginArea: { type: AreaType, resolve: getUnderscored },
    endArea: { type: AreaType, resolve: getUnderscored },
    ...fieldWithID('gender'),
    ...fieldWithID('type'),
    lifeSpan: { type: LifeSpanType, resolve: getHyphenated },
    works: { type: new GraphQLList(WorkType) },
    recordings: { type: new GraphQLList(RecordingType) },
    releases: {
      type: new GraphQLList(ReleaseType),
      args: { type: { type: GraphQLString }, status: { type: GraphQLString } }
    },
    releaseGroups: {
      type: new GraphQLList(ReleaseGroupType),
      args: { type: { type: GraphQLString } },
      resolve: getHyphenated
    }
  })
})
