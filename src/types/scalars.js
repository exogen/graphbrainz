import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'

function createScalar (config) {
  return new GraphQLScalarType({
    serialize: value => value,
    parseValue: value => value,
    parseLiteral (ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value
      }
      return null
    },
    ...config
  })
}

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const locale = /^([a-z]{2})(_[A-Z]{2})?(\.[A-Z0-9-]+)?$/
// Be extremely lenient; just prevent major input errors.
const url = /^\w+:\/\/[\w-]+\.\w+/

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

function validateLocale (value) {
  if (typeof value === 'string' && locale.test(value)) {
    return value
  }
  throw new TypeError(`Malformed locale: ${value}`)
}

function validateURL (value) {
  if (typeof value === 'string' && url.test(value)) {
    return value
  }
  throw new TypeError(`Malformed URL: ${value}`)
}

export const ASIN = createScalar({
  name: 'ASIN',
  description: `An [Amazon Standard Identification Number](https://musicbrainz.org/doc/ASIN)
(ASIN) is a 10-character alphanumeric unique identifier assigned by Amazon.com
and its partners for product identification within the Amazon organization.`
})

export const DateType = createScalar({
  name: 'Date',
  description: 'Year, month (optional), and day (optional) in YYYY-MM-DD format.'
})

export const Degrees = createScalar({
  name: 'Degrees',
  description: 'Decimal degrees, used for latitude and longitude.'
})

export const Duration = createScalar({
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

export const IPI = createScalar({
  name: 'IPI',
  description: `An [IPI](https://musicbrainz.org/doc/IPI) (interested party
information) code is an identifying number assigned by the CISAC database for
musical rights management.`
})

export const ISNI = createScalar({
  name: 'ISNI',
  description: `The [International Standard Name Identifier](https://musicbrainz.org/doc/ISNI)
(ISNI) is an ISO standard for uniquely identifying the public identities of
contributors to media content.`
})

export const ISWC = createScalar({
  name: 'ISWC',
  description: `The [International Standard Musical Work Code](https://musicbrainz.org/doc/ISWC)
(ISWC) is an ISO standard similar to ISBNs for identifying musical works /
compositions.`
})

export const Locale = createScalar({
  name: 'Locale',
  description: 'Language code, optionally with country and encoding.',
  serialize: validateLocale,
  parseValue: validateLocale,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return validateLocale(ast.value)
    }
    return null
  }
})

export const MBID = createScalar({
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

export const Time = createScalar({
  name: 'Time',
  description: 'A time of day, in 24-hour hh:mm notation.'
})

export const URLString = createScalar({
  name: 'URLString',
  description: 'A web address.',
  serialize: validateURL,
  parseValue: validateURL,
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return validateURL(ast.value)
    }
    return null
  }
})
