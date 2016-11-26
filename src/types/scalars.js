import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

function validateMBID (value) {
  if (typeof value === 'string' && uuid.test(value)) {
    return value
  }
  throw new TypeError(`Malformed MBID: ${value}`)
}

function validatePositive (value) {
  if (value >= 0) {
    return value
  }
  throw new TypeError(`Expected positive value: ${value}`)
}

export const DateType = new GraphQLScalarType({
  name: 'Date',
  description:
    'Year, month (optional), and day (optional) in YYYY-MM-DD format.',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const Degrees = new GraphQLScalarType({
  name: 'Degrees',
  description: 'Decimal degrees, used for latitude and longitude.',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const Duration = new GraphQLScalarType({
  name: 'Duration',
  description: 'A length of time, in milliseconds.',
  serialize: validatePositive,
  parseValue: validatePositive,
  parseLiteral (ast) {
    if (ast.kind === Kind.INT) {
      return validatePositive(parseInt(ast.value, 10))
    }
    return null
  }
})

export const IPI = new GraphQLScalarType({
  name: 'IPI',
  description: `An [IPI](https://musicbrainz.org/doc/IPI) (interested party
information) code is an identifying number assigned by the CISAC database for
musical rights management.`,
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const ISNI = new GraphQLScalarType({
  name: 'ISNI',
  description: `The [International Standard Name Identifier](https://musicbrainz.org/doc/ISNI)
(ISNI) is an ISO standard for uniquely identifying the public identities of
contributors to media content.`,
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const ISWC = new GraphQLScalarType({
  name: 'ISWC',
  description: `The [International Standard Musical Work Code](https://musicbrainz.org/doc/ISWC)
(ISWC) is an ISO standard similar to ISBNs for identifying musical works /
compositions.`,
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const Locale = new GraphQLScalarType({
  name: 'Locale',
  description: 'Language code, optionally with country and encoding.',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const Time = new GraphQLScalarType({
  name: 'Time',
  description: 'A time of day, in 24-hour hh:mm notation.',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const URLString = new GraphQLScalarType({
  name: 'URLString',
  description: 'A web address.',
  serialize: value => value,
  parseValue: value => value,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value
    }
    return null
  }
})

export const MBID = new GraphQLScalarType({
  name: 'MBID',
  description: `The MBID scalar represents MusicBrainz identifiers, which are
36-character UUIDs.`,
  serialize: validateMBID,
  parseValue: validateMBID,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return validateMBID(ast.value)
    }
    return null
  }
})
