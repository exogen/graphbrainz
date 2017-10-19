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


- [Loading Extensions](#loading-extensions)
- [Built-in Extensions](#built-in-extensions)
- [Extension API](#extension-api)
  - [Properties](#properties)
    - [name](#name)
    - [description](#description)
    - [extendContext](#extendcontext)
    - [extendSchema](#extendschema)
  - [Example](#example)
- [Extension Guidelines](#extension-guidelines)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Loading Extensions

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
  'graphbrainz/extensions/mediawiki',
  'graphbrainz/extensions/the-audio-db'
]
```

## Built-in Extensions

The following extensions are included with GraphBrainz and loaded by default.
See their respective documentation pages for schema info and config options.

* [Cover Art Archive](./cover-art-archive.md): Retrieve cover art images for
  releases from the Cover Art Archive.
* [fanart.tv](./fanart-tv.md): Retrieve high quality artwork for artists,
  releases, and labels from fanart.tv.
* [MediaWiki](./mediawiki.md): Retrieve information from MediaWiki image pages,
  like the actual image file URL and EXIF metadata.
* [TheAudioDB](./the-audio-db): Retrieve images and information about artists,
  releases, and recordings from TheAudioDB.com.

## Extension API

The core idea behind extensions comes from the [schema stitching][] feature
from [graphql-tools][], although GraphBrainz does not currently use the exact
technique documented there. Instead, we call `parse` and `extendSchema` from
[GraphQL.js][], followed by [addResolveFunctionsToSchema][].

Extensions must export an object shaped like so:

```js
type Extension = {
  name: string,
  description?: string,
  extendContext?: (context: Context, options: Options) => Context,
  extendSchema?:
    { schemas: Array<string | DocumentNode>, resolvers: ResolverMap } |
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

If it is an object, it should have a `schemas` array and a `resolvers` object.
Each schema must be a string (containing type definitions in GraphQL schema
language) or a `DocumentNode` (if the type definitions have already been
parsed). The `resolvers` object should contain a mapping of type fields to new
resolver functions for those fields. See [addResolveFunctionsToSchema][].

If it is a function, it should accept `schema` and `options` arguments and
return a new schema. Use this if you’d like to perform custom schema extension
logic. This may be necessary if you already have a `GraphQLSchema` instance and
want to use [mergeSchemas][], for example. In most cases, you should keep it
simple and use the object form.

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
    resolvers: {
      Query: {
        helloWorld: {
          resolve: () => 'It worked!'
        }
      }
    }
  }
}
```

This will allow the following query to be made:

```graphql
{
  helloWorld
}
```

See the code for the [built-in extensions][] for more examples.

## Extension Guidelines

Extensions can load and resolve data in any manner they please. However, you
should try to remain consistent with the behavior of GraphBrainz and its
built-in extensions. Here are some recommendations for writing a good extension:

* If you need to make HTTP requests, using a [Client][] subclass will get you
  rate limiting, error handling, and a Promise-based API for free.
* Default to following the rate limiting rules of any APIs you wrap. If there
  are no guidelines on rate limiting, consider playing nice anyway and limiting
  your client to around 1 to 10 requests per second.
* Use a [DataLoader][dataloader] instance to batch and cache requests. Even if
  the data source doesn’t support batching, it will dedupe in-flight requests
  for the same key, preventing extra requests before the response has been
  cached.
* Use a configurable cache (the `cacheMap` option to DataLoader is a good place
  to put it) and make sure you aren’t caching everything indefinitely by
  accident.
* Get as much configuration from environment variables as possible, so that
  people can just run the standalone server instead of writing code. If you need
  more complex configuration, use a single object on the `options` object as
  a namespace for your extension’s options.
* Don’t be afraid to rename fields returned by third-party APIs when translating
  them to the GraphQL schema. Consistency with GraphQL conventions and the
  GraphBrainz schema is more desirable than consistency with the original API
  being wrapped. Some general rules:
  * Use camel case naming and capitalize acronyms (unless they are the only
    word), e.g. `id`, `url`, `artistID`, `pageURL`.
  * If it’s ambiguous whether a field refers to an object/list vs. a scalar
    summary of an object/list, consider clarifying the field name, e.g. `user` →
    `userID`, `members` → `memberCount`.
  * Don’t include fields that are already available in MusicBrainz, only include
    what’s relevant and useful.
* Add descriptions for everything: types, fields, arguments, enum values, etc.
  – with Markdown links wherever they’d be helpful.
* When extending the built-in types, prefer adding a single object field that
  serves as a namespace rather than adding many fields. That way it’s more
  obvious that the data source isn’t MusicBrainz itself, and you’re less likely
  to conflict with new MusicBrainz fields in the future.
* Prefer using a [Relay][]-compliant schema for lists of objects that (1) have
  their own IDs and (2) are likely to be paginated. Feel free to add a `nodes`
  shortcut field to the Connection type (for users who want to skip over
  `edges`).
* If you publish your extension, consider prefixing the package name with
  `graphbrainz-extension-` and having the default export of its `main` entry
  point be the extension object. That way, using it is as simple as adding the
  package name to the list of extensions.
* Consider using [graphql-markdown][] to document the schema created by your
  extension; this will match how GraphBrainz itself is documented. You can use
  the [diffSchema][] function to document only the schema updates, see
  [scripts/build-extension-docs.js][build-extension-docs] for how this is done
  with the built-in extensions.

[graphql-tools]: http://dev.apollodata.com/tools/graphql-tools/index.html
[schema stitching]: http://dev.apollodata.com/tools/graphql-tools/schema-stitching.html
[mergeSchemas]: http://dev.apollodata.com/tools/graphql-tools/schema-stitching.html#mergeSchemas
[dataloader]: https://github.com/facebook/dataloader
[built-in extensions]: ../../src/extensions
[Client]: ../../src/api/client.js
[graphql-markdown]: https://github.com/exogen/graphql-markdown
[diffSchema]: https://github.com/exogen/graphql-markdown#diffschemaoldschema-object-newschema-object-options-object
[build-extension-docs]: ../../scripts/build-extension-docs.js
[Relay]: https://facebook.github.io/relay/
[GraphQL.js]: http://graphql.org/graphql-js/
[addResolveFunctionsToSchema]: http://dev.apollodata.com/tools/graphql-tools/resolvers.html#addResolveFunctionsToSchema
