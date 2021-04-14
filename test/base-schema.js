import test from 'ava';
import { baseSchema } from '../src/schema.js';

test.before((t) => {
  t.context.schema = baseSchema;
});

import './_schema.js';
