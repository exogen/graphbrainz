import test from 'ava'
import Node from '../../src/types/node'
import ReleaseGroup from '../../src/types/release-group'

test('loads types from their module', t => {
  t.is(Node.resolveType({ _type: 'release-group' }), ReleaseGroup)
})

test('returns null for unknown types', t => {
  t.is(Node.resolveType({ _type: 'foo' }), null)
})
