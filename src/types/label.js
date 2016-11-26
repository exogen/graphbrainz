import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from 'graphql/type'
import { connectionDefinitions } from 'graphql-relay'
import Node from './node'
import Entity from './entity'
import { IPI } from './scalars'
import Area from './area'
import {
  id,
  mbid,
  name,
  sortName,
  disambiguation,
  lifeSpan,
  releases,
  fieldWithID
} from './helpers'

const Label = new GraphQLObjectType({
  name: 'Label',
  description: `[Labels](https://musicbrainz.org/doc/Label) represent mostly
(but not only) imprints. To a lesser extent, a label entity may be created to
represent a record company.`,
  interfaces: () => [Node, Entity],
  fields: () => ({
    id,
    mbid,
    name,
    sortName,
    disambiguation,
    country: {
      type: GraphQLString,
      description: 'The country of origin for the label.'
    },
    area: {
      type: Area,
      description: 'The area in which the label is based.'
    },
    lifeSpan,
    labelCode: {
      type: GraphQLInt,
      description: `The [“LC” code](https://musicbrainz.org/doc/Label/Label_Code)
of the label.`
    },
    ipis: {
      type: new GraphQLList(IPI),
      description: `List of IPI (interested party information) codes for the
label.`
    },
    ...fieldWithID('type', {
      description: `A type describing the main activity of the label, e.g.
imprint, production, distributor, rights society, etc.`
    }),
    releases
  })
})

const { connectionType: LabelConnection } = connectionDefinitions({ nodeType: Label })
export { LabelConnection }
export default Label
