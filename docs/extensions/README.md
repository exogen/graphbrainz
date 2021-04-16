# Extensions

It is possible to extend the GraphBrainz schema to add integrations with
third-party services that provide more information about MusicBrainz entities.
Extensions can define new GraphQL types and use the `extend type` syntax to add
new fields to any existing GraphBrainz type, including the root query.

Several extensions are included by default, and you can install any number of
additional extensions from a package manager or
[write your own](#extension-api).

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Loading Extensions](#loading-extensions)
- [Built-in Extensions](#built-in-extensions)
- [More Extensions](#more-extensions)
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
exported `middleware()` function. Each extension must be an object conforming to
the [Extension API](#extension-api), or the path to a module to load via
`require()` that exports such an object.

If you are running GraphBrainz as a standalone server, you may specify
extensions via the `GRAPHBRAINZ_EXTENSIONS` environment variable, which will be
parsed as a JSON array. For example:

```console
$ export GRAPHBRAINZ_EXTENSIONS='["graphbrainz/extensions/fanart-tv"]'
$ graphbrainz
```

Note that some extensions may require additional configuration via extra options
or environment variables. Check the documentation for each extension you use.

The default extensions configuration looks like this:

```js
middleware({
  extensions: [
    'graphbrainz/extensions/cover-art-archive',
    'graphbrainz/extensions/fanart-tv',
    'graphbrainz/extensions/mediawiki',
    'graphbrainz/extensions/the-audio-db',
  ],
});
```

## Built-in Extensions

The following extensions are included with GraphBrainz and loaded by default.
See their respective documentation pages for schema info and config options.

- [Cover Art Archive](./cover-art-archive.md): Retrieve cover art images for
  releases from the Cover Art Archive.
- [fanart.tv](./fanart-tv.md): Retrieve high quality artwork for artists,
  releases, and labels from fanart.tv.
- [MediaWiki](./mediawiki.md): Retrieve information from MediaWiki image pages,
  like the actual image file URL and EXIF metadata.
- [TheAudioDB](./the-audio-db.md): Retrieve images and information about
  artists, releases, and recordings from TheAudioDB.com.

## More Extensions

The following extensions are published separately, but can easily be added to
GraphBrainz by installing them:

- [Last.fm](https://github.com/exogen/graphbrainz-extension-lastfm): Retrieve
  artist, release, and recording information from
  [Last.fm](https://www.last.fm/).
- [Discogs](https://github.com/exogen/graphbrainz-extension-discogs): Retrieve
  artist, label, release, and release group information from
  [Discogs](https://www.discogs.com/).
- [Spotify](https://github.com/exogen/graphbrainz-extension-spotify): Retrieve
  artist, release, and recording information from
  [Spotify](https://www.spotify.com/).

## Extension API

The core idea behind extensions comes from the [schema stitching][] feature from
[graphql-tools][], although GraphBrainz does not currently use the exact
technique documented there. Instead, we call `parse` and `extendSchema` from
[GraphQL.js][], followed by [addResolversToSchema][].

Extensions must export an object shaped like so:

```js
type Extension = {
  name: string,
  description?: string,
  extendContext?: (context: Context, options: Options) => Context,
  extendSchema?:
    | { schemas: Array<string | DocumentNode>, resolvers: ResolverMap }
    | ((schema: GraphQLSchema, options: Options) => GraphQLSchema),
};
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
resolver functions for those fields. See [addResolversToSchema][].

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
    schemas: [
      `
      extend type Query {
        helloWorld: String!
      }
    `,
    ],
    resolvers: {
      Query: {
        helloWorld: {
          resolve: () => 'It worked!',
        },
      },
    },
  },
};
```

This will allow the following query to be made:

```graphql
{
  helloWorld
}
```

See the code for the [built-in extensions][] for more examples.

## Extension Guidelines

Extensions can load and resolve data in any manner they please, and you can
write them in any way that conforms to the API. But if you want an extra feather
in your cap, there are a few guidelines you should follow in order to maintain
consistency with GraphBrainz and the built-in extensions. Here are some tips for
writing a good extension:

- If you need to make HTTP requests, using a [Client][] subclass will get you
  rate limiting, error handling, retrying, and a Promise-based API for free.
- Default to following the rate limiting rules of any APIs you use. If there are
  no guidelines on rate limiting, consider playing nice anyway and limiting your
  client to around 1 to 10 requests per second.
- Use a [DataLoader][dataloader] instance to batch and cache requests. Even if
  the data source doesn’t support batching, DataLoader will help by deduping
  in-flight requests for the same key, preventing unnecessary requests.
- Use a configurable cache and make sure you aren’t caching everything
  indefinitely by accident. The `cacheMap` option to DataLoader is a good place
  to put it.
- Get as much configuration from environment variables as possible so that users
  can just run the standalone server instead of writing any code. If you need
  more complex configuration, use a single field on the `options` object as a
  namespace for your extension’s options.
- Don’t hesitate to rename fields returned by third-party APIs when translating
  them to the GraphQL schema. Consistency with GraphQL conventions and the
  GraphBrainz schema is more desirable than consistency with the original API
  being used. Some general rules:
  - Match type names to the service they’re coming from (e.g. many services use
    the words “album” and “track” and the type names should reflect that), but
    match scalar field names to their MusicBrainz equivalents when possible
    (e.g. `name` for artists but `title` for releases and recordings).
  - Use camel case naming and capitalize acronyms (unless they are the only
    word), e.g. `id`, `url`, `artistID`, `pageURL`.
  - If it’s ambiguous whether a field refers to an object/list vs. a scalar
    summary of an object/list, consider clarifying the field name, e.g. `user` →
    `userID`, `members` → `memberCount`.
  - Don’t include fields that are already available in MusicBrainz (unless it’s
    possible to retrieve an entity that isn’t in MusicBrainz). Only include
    what’s relevant and useful.
- Add descriptions for everything: types, fields, arguments, enum values, etc.
  – with Markdown links wherever they’d be helpful.
- When extending the built-in types, prefer adding a single object field that
  serves as a namespace rather than adding many fields. That way it’s more
  obvious that the data source isn’t MusicBrainz itself, and you’re less likely
  to conflict with new MusicBrainz fields in the future.
- Prefer using a [Relay][]-compliant schema for lists of objects that (1) have
  their own IDs and (2) are likely to be paginated. Feel free to add a `nodes`
  shortcut field to the Connection type (for users who want to skip over
  `edges`).
- If you publish your extension, consider prefixing the package name with
  `graphbrainz-extension-` and having the default export of its `main` entry
  point be the extension object. That way, using it is as simple as adding the
  package name to the list of extensions.
- Consider using [graphql-markdown][] to document the schema created by your
  extension; this will match how GraphBrainz itself is documented. You can use
  the [diffSchema][] function to document only the schema updates, see
  [scripts/build-extension-docs.js][build-extension-docs] for how this is done
  with the built-in extensions.

[graphql-tools]: http://dev.apollodata.com/tools/graphql-tools/index.html
[schema stitching]:
  http://dev.apollodata.com/tools/graphql-tools/schema-stitching.html
[mergeschemas]:
  http://dev.apollodata.com/tools/graphql-tools/schema-stitching.html#mergeSchemas
[dataloader]: https://github.com/facebook/dataloader
[built-in extensions]: ../../src/extensions
[client]: ../../src/api/client.js
[graphql-markdown]: https://github.com/exogen/graphql-markdown
[diffschema]:
  https://github.com/exogen/graphql-markdown#diffschemaoldschema-object-newschema-object-options-object
[build-extension-docs]: ../../scripts/build-extension-docs.js
[relay]: https://facebook.github.io/relay/
[graphql.js]: http://graphql.org/graphql-js/
[addresolverstoschema]:
  http://dev.apollodata.com/tools/graphql-tools/resolvers.html#addResolversToSchema
