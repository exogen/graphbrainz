import { GraphQLObjectType, GraphQLList } from 'graphql/type'
import Node from './node'
import Entity from './entity'
import { DateType } from './scalars'
import { ReleaseGroupType } from './enums'
import {
  id,
  mbid,
  title,
  disambiguation,
  aliases,
  artistCredit,
  artistCredits,
  artists,
  releases,
  relationships,
  collections,
  rating,
  tags,
  fieldWithID,
  resolveHyphenated,
  connectionWithExtras
} from './helpers'

const ReleaseGroup = new GraphQLObjectType({
  name: 'ReleaseGroup',
  description: `A [release group](https://musicbrainz.org/doc/Release_Group) is
used to group several different releases into a single logical entity. Every
release belongs to one, and only one release group.

Both release groups and releases are “albums” in a general sense, but with an
important difference: a release is something you can buy as media such as a CD
or a vinyl record, while a release group embraces the overall concept of an
album – it doesn’t matter how many CDs or editions/versions it had.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    title,
    disambiguation,
    aliases,
    artistCredit,
    artistCredits,
    firstReleaseDate: {
      type: DateType,
      description: 'The date of the earliest release in the group.',
      resolve: resolveHyphenated
    },
    ...fieldWithID('primaryType', {
      type: ReleaseGroupType,
      description: `The [type](https://musicbrainz.org/doc/Release_Group/Type)
of a release group describes what kind of releases the release group represents,
e.g. album, single, soundtrack, compilation, etc. A release group can have a
“main” type and an unspecified number of additional types.`
    }),
    ...fieldWithID('secondaryTypes', {
      type: new GraphQLList(ReleaseGroupType),
      description: `Additional [types](https://musicbrainz.org/doc/Release_Group/Type)
that apply to this release group.`
    }),
    artists,
    releases,
    relationships,
    collections,
    rating,
    tags
  })
})

export const ReleaseGroupConnection = connectionWithExtras(ReleaseGroup)
export default ReleaseGroup
