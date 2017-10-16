# Extensions

It is possible to extend the GraphBrainz schema to add integrations with
third-party services that provide more information about MusicBrainz entities.
Several extensions are included by default, and you can install any number of
additional extensions from a package manager or [your own modules](#extension-api).

Extensions can define new types and use the `extend type` syntax to add new
fields to the root query or any existing GraphBrainz type.

## Specifying extensions

Extensions are specified using the `extensions` option to the exported
`graphbrainz()` middleware function. Each extension must be an object conforming
to the [Extension API](#extension-api), or a module path to load via `require()`
that exports such an object.

If you are running GraphBrainz as a standalone server, you may specify
extensions via the `GRAPHBRAINZ_EXTENSIONS` environment variable, which will be
parsed as a JSON array. For example:

```console
$ export GRAPHBRAINZ_EXTENSIONS='["graphbrainz/extensions/fanart-tv"]'
$ graphbrainz
```

Note that some extensions may require additional configuration via extra options
or environment variables. Check the documentation for each extension you use.

## Built-in extensions

The following extensions are included with GraphBrainz and loaded by default.

### Cover Art Archive

Retrieve cover art images for releases from the Cover Art Archive API. See the
[documentation](./cover-art-archive.md) for details.

Use the path `graphbrainz/extensions/cover-art-archive` to specify this
extension.

### fanart.tv

Retrieve high quality artwork for artists, releases, and labels from the
fanart.tv API. See the [documentation](./fanart-tv.md) for details.

Use the path `graphbrainz/extensions/fanart-tv` to specify this extension.

### TheAudioDB

Retrieve images and information about artists, releases, and recordings from the
TheAudioDB.com API. See the [documentation](./the-audio-db.md) for details.

Use the path `graphbrainz/extensions/the-audio-db` to specify this extension.

### Wikimedia

Retrieve information from Wikimedia image pages, like the actual image file URL
and EXIF metadata. See the [documentation](./wikimedia.md) for details.

Use the path `graphbrainz/extensions/wikimedia` to specify this extension.

## Extension API

The core idea behind extensions comes from the [schema stitching][] feature
from [graphql-tools][]. To write an extension, you’ll want to be familiar with
the [mergeSchemas][] function.

Extensions must export an object shaped like so:

```js
type Extension = {
  name: string,
  description?: string,
  extendContext?: (context: Context, options: Options) => Context,
  extendSchema?:
    MergeSchemasArg |
    (schema: GraphQLSchema, options: Options) => GraphQLSchema
}
```

### Properties

#### name

The name of the extension.

#### description

A description of the functionality that the extension provides.

#### extendContext

An optional function that accepts a base context object (the `context` argument
available to resolver functions) and returns a new context object. Extensions
that access a third-party APIs should add any API client instances they need
here. The recommended way is to create a loader with [dataloader][] and add it
onto `context.loaders`.

#### extendSchema

An optional object or function to extend the GraphBrainz schema.

If it is an object, then it should be the same shape as the argument to
[mergeSchemas][]. It will be passed to [mergeSchemas][] with the current
GraphBrainz schema prepended to the `schemas` property for you.

If is a function, it should accept `schema` and `options` arguments and return
a new schema. Use this if you’d like to perform custom schema extension logic.
In most cases, you should use an object instead.

### Example

```js
module.exports = {
  name: 'Hello World',
  description: 'A simple example extension.',
  extendSchema: {
    schemas: [`
      extend type Query {
        helloWorld: String!
      }
    `],
    resolvers: mergeInfo => ({
      Query: {
        helloWorld: {
          resolve: () => 'It worked!'
        }
      }
    })
  }
}
```

This will allow the following query to be made:

```graphql
{
  helloWorld
}
```

[graphql-tools]: http://dev.apollodata.com/tools/graphql-tools/index.html
[schema stitching]: http://dev.apollodata.com/tools/graphql-tools/schema-stitching.html
[mergeSchemas]: http://dev.apollodata.com/tools/graphql-tools/schema-stitching.html#mergeSchemas
[dataloader]: https://github.com/facebook/dataloader
