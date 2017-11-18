/**
 * This module only exists because as of this writing, `graphql-tag` doesn't
 * support type, field, or argument descriptions. That's a bummer, so this
 * simple tag is provided instead. It doesn't support any type of interpolation
 * whatsoever, but will parse the GraphQL document, allow syntax highlighting,
 * and enable Prettier formatting.
 */
import { parse } from 'graphql'

export default function gql(literals, ...interpolations) {
  if (literals.length !== 1 || interpolations.length) {
    throw new Error('The gql template tag does not support interpolation.')
  }
  return parse(literals[0])
}
