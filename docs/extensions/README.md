# Extensions

It is possible to extend the GraphBrainz schema to add integrations with
third-party services that provide more information about MusicBrainz entities.
Extensions can define new GraphQL types and use the `extend type` syntax to add
new fields to any existing GraphBrainz type, including the root query.

Several extensions are included by default, and you can install any number of
additional extensions from a package manager or [write your own](#extension-api).

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Loading extensions](#loading-extensions)
- [Built-in extensions](#built-in-extensions)
- [Extension API](#extension-api)
  - [Properties](#properties)
    - [name](#name)
    - [description](#description)
    - [extendContext](#extendcontext)
    - [extendSchema](#extendschema)
  - [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Loading extensions

The extensions to load are specified using the `extensions` option to the
exported `graphbrainz()` middleware function. Each extension must be an object
conforming to the [Extension API](#extension-api), or the path to a module to
load via `require()` that exports such an object.

If you are running GraphBrainz as a standalone server, you may specify
extensions via the `GRAPHBRAINZ_EXTENSIONS` environment variable, which will be
parsed as a JSON array. For example:

```console
$ export GRAPHBRAINZ_EXTENSIONS='["graphbrainz/extensions/fanart-tv"]'
$ graphbrainz
```

Note that some extensions may require additional configuration via extra options
or environment variables. Check the documentation for each extension you use.

The default value of the `extensions` option looks like this:

```js
[
  'graphbrainz/extensions/cover-art-archive',
  'graphbrainz/extensions/fanart-tv',
  'graphbrainz/extensions/the-audio-db',
  'graphbrainz/extensions/wikimedia'
]
```

## Built-in extensions

The following extensions are included with GraphBrainz and loaded by default.
See their respective documentation pages for schema info and config options.

* [Cover Art Archive](./cover-art-archive.md): Retrieve cover art images for
  releases from the Cover Art Archive.
* [fanart.tv](./fanart-tv.md): Retrieve high quality artwork for artists,
  releases, and labels from fanart.tv.
* [TheAudioDB](./the-audio-db): Retrieve images and information about artists,
  releases, and recordings from TheAudioDB.com.
* [Wikimedia](./wikimedia.md): Retrieve information from Wikimedia image pages,
  like the actual image file URL and EXIF metadata.

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
that access third-party APIs should add any API client instances they need here.
The recommended way is to create a loader with [dataloader][] and add it onto
`context.loaders`.

#### extendSchema

An optional object or function to extend the GraphBrainz schema.

If it is an object, it should be the same shape as the argument to
[mergeSchemas][]. It will be passed to [mergeSchemas][] with the current
GraphBrainz schema prepended to the `schemas` array automatically.

If it is a function, it should accept `schema` and `options` arguments and
return a new schema. Use this if you’d like to perform custom schema extension
logic. In most cases, you should use an object instead.

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
