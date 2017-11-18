import schema, { createSchema } from '../../src/schema'
import { defaultExtensions } from '../../src'

export default {
  baseSchema: schema,
  extendedSchema: createSchema(schema, { extensions: defaultExtensions })
}
