import test from 'ava';
import { baseSchema, createSchema } from '../src/schema.js';
import { defaultExtensions, loadExtension } from '../src/index.js';

test.before(async (t) => {
  const extensions = await Promise.all(
    defaultExtensions.map((extension) => loadExtension(extension))
  );
  const schema = createSchema(baseSchema, { extensions });
  t.context.schema = schema;
});

import './_schema.js';
