import test from 'ava'
import Node from '../../src/types/node'
import ReleaseGroup from '../../src/types/release-group'
import schema from '../../src/schema'

test('loads types from their module', t => {
  t.is(
    Node.resolveType({ _type: 'release-group' }, {}, { schema }),
    ReleaseGroup
  )
})

test('returns undefined for unknown types', t => {
  t.is(Node.resolveType({ _type: 'foo' }, {}, { schema }), undefined)
})
