import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql/type'

function createScalar(config) {
  return new GraphQLScalarType({
    serialize: value => value,
    parseValue: value => value,
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value
      }
      return undefined
    },
    ...config
  })
}

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
const locale = /^([a-z]{2})(_[A-Z]{2})?(\.[a-zA-Z0-9-]+)?$/
// Be extremely lenient; just prevent major input errors.
const url = /^\w+:\/\/[\w-]+\.\w+/

function validateMBID(value) {
  if (typeof value === 'string' && uuid.test(value)) {
    return value
  }
  throw new TypeError(`Malformed MBID: ${value}`)
}

function validatePositive(value) {
  if (value >= 0) {
    return value
  }
  throw new TypeError(`Expected positive value: ${value}`)
}

function validateLocale(value) {
  if (typeof value === 'string' && locale.test(value)) {
    return value
  }
  throw new TypeError(`Malformed locale: ${value}`)
}

function validateURL(value) {
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
  description:
    'Year, month (optional), and day (optional) in YYYY-MM-DD format.'
})

export const Degrees = createScalar({
  name: 'Degrees',
  description: 'Decimal degrees, used for latitude and longitude.'
})

export const DiscID = createScalar({
  name: 'DiscID',
  description: `[Disc ID](https://musicbrainz.org/doc/Disc_ID) is the code
number which MusicBrainz uses to link a physical CD to a [release](https://musicbrainz.org/doc/Release)
listing.

A release may have any number of disc IDs, and a disc ID may be linked to
multiple releases. This is because disc ID calculation involves a hash of the
frame offsets of the CD tracks.

Different pressing of a CD often have slightly different frame offsets, and
hence different disc IDs.

Conversely, two different CDs may happen to have exactly the same set of frame
offsets and hence the same disc ID.`
})

export const Duration = createScalar({
  name: 'Duration',
  description: 'A length of time, in milliseconds.',
  serialize: validatePositive,
  parseValue: validatePositive,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return validatePositive(parseInt(ast.value, 10))
    }
    return undefined
  }
})

export const IPI = createScalar({
  name: 'IPI',
  description: `An [Interested Parties Information](https://musicbrainz.org/doc/IPI)
(IPI) code is an identifying number assigned by the CISAC database for musical
rights management.`
})

export const ISNI = createScalar({
  name: 'ISNI',
  description: `The [International Standard Name Identifier](https://musicbrainz.org/doc/ISNI)
(ISNI) is an ISO standard for uniquely identifying the public identities of
contributors to media content.`
})

export const ISRC = createScalar({
  name: 'ISRC',
  description: `The [International Standard Recording Code](https://musicbrainz.org/doc/ISRC)
(ISRC) is an identification system for audio and music video recordings. It is
standarized by the [IFPI](http://www.ifpi.org/) in ISO 3901:2001 and used by
IFPI members to assign a unique identifier to every distinct sound recording
they release. An ISRC identifies a particular [sound recording](https://musicbrainz.org/doc/Recording),
not the song itself. Therefore, different recordings, edits, remixes and
remasters of the same song will each be assigned their own ISRC. However, note
that same recording should carry the same ISRC in all countries/territories.
Songs are identified by analogous [International Standard Musical Work Codes](https://musicbrainz.org/doc/ISWC)
(ISWCs).`
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
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return validateLocale(ast.value)
    }
    return undefined
  }
})

export const MBID = createScalar({
  name: 'MBID',
  description: `The MBID scalar represents MusicBrainz identifiers, which are
36-character UUIDs.`,
  serialize: validateMBID,
  parseValue: validateMBID,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return validateMBID(ast.value)
    }
    return undefined
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
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return validateURL(ast.value)
    }
    return undefined
  }
})
