import test from 'ava';
import sinon from 'sinon';
import { prettyPrint } from '../src/util.js';

test.beforeEach((t) => {
  sinon.stub(console, 'log');
});
test.afterEach((t) => {
  console.log.restore();
});

test('prettyPrint writes to stdout', (t) => {
  prettyPrint('foo');
  t.true(console.log.calledOnce);
});
