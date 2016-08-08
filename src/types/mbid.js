import { Kind } from 'graphql'
import { GraphQLScalarType } from 'graphql/type'

// e.g. 24fdb962-65ef-41ca-9ba3-7251a23a84fc
const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

function uuid (value) {
  if (typeof value === 'string' && value.length === 36 && regex.test(value)) {
    return value
  }
  throw new TypeError(`Malformed UUID: ${value}`)
}

export default new GraphQLScalarType({
  name: 'MBID',
  description:
    'The `MBID` scalar represents MusicBrainz identifiers, which are ' +
    '36-character UUIDs.',
  serialize: uuid,
  parseValue: uuid,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return uuid(ast.value)
    }
    return null
  }
})
