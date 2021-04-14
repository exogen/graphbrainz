import test from 'ava';
import { Node } from '../../src/types/node.js';
import { ReleaseGroup } from '../../src/types/release-group.js';
import { baseSchema as schema } from '../../src/schema.js';

test('loads types from their module', (t) => {
  t.is(
    Node.resolveType({ _type: 'release-group' }, {}, { schema }),
    ReleaseGroup
  );
});

test('returns undefined for unknown types', (t) => {
  t.is(Node.resolveType({ _type: 'foo' }, {}, { schema }), undefined);
});
