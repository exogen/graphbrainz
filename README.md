# graphbrainz

An [Express][] server and middleware for querying [MusicBrainz][] using
[GraphQL][].

```sh
npm install graphbrainz --save
```

**[Try out the live demo!][demo]** Use the “Docs” sidebar or see the [schema][]
to help construct your query.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Usage](#usage)
  - [As a standalone server](#as-a-standalone-server)
  - [As middleware](#as-middleware)
  - [Environment Variables](#environment-variables)
  - [Debugging](#debugging)
- [Example Queries](#example-queries)
- [Schema](#schema)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage

This package can be used both as a standalone GraphQL server and as Express
middleware supplying a GraphQL endpoint.

### As a standalone server

Run the included `graphbrainz` executable to start the server. The server
is configured using [environment variables](#environment-variables).

```sh
$ graphbrainz
Listening on port 3000.
```

Development mode features like JSON pretty printing and the [GraphiQL][]
interface will be enabled unless the server is run with `NODE_ENV=production`.

Note that if you are not running the standalone server within another Node
project, you may wish to install this package globally so that the `graphbrainz`
script is globally available:

```sh
npm install -g graphbrainz
```

### As middleware

If you have an existing Express server and want to add this GraphQL service as
an endpoint, or you just want more customization, use the middleware.

```js
import express from 'express';
import graphbrainz from 'graphbrainz';

const app = express();

// Use the default options:
app.use('/graphbrainz', graphbrainz());

// or, pass some options:
app.use('/graphbrainz', graphbrainz({
  client: new MusicBrainz({ ... }),
  graphiql: true,
  ...
}));

app.listen(3000);
```

The `graphbrainz` middleware function accepts the following options:

* **`client`**: A custom API client instance to use. See the
  [client submodule](src/api.js) for help with creating a custom instance.
* Any remaining options are passed along to the standard GraphQL middleware.
  See the [express-graphql][] documentation for more information.

### Environment Variables

* **`MUSICBRAINZ_BASE_URL`**: The base MusicBrainz API URL to use. Change this
  if you are running your own MusicBrainz mirror. Defaults to `http://musicbrainz.org/ws/2/`.
* **`GRAPHBRAINZ_PATH`**: The URL route at which to expose the GraphQL endpoint,
  if running the standalone server. Defaults to `/`.
* **`GRAPHBRAINZ_GRAPHIQL`**: Set this to `true` if you want to force the
  [GraphiQL][] interface to be available even in production mode.
* **`PORT`**: Port number to use, if running the standalone server.

When running the standalone server, [dotenv][] is used to load these variables
from a `.env` file, if one exists in the current working directory. See the
[dotenv][] package for more information.

### Debugging

The `DEBUG` environment variable can be used to enable logging for all (or just
some) of this package’s submodules:

```sh
$ DEBUG=graphbrainz:* graphbrainz
```

See the [debug][] package for more information.

## Example Queries

Nirvana albums and the singles from each album:

```graphql
{
  lookup {
    artist(mbid: "5b11f4ce-a62d-471e-81fc-a69a8278c7da") {
      name
      releaseGroups(type: ALBUM) {
        edges {
          node {
            title
            firstReleaseDate
            relationships {
              releaseGroups(type: "single from") {
                edges {
                  node {
                    target {
                      ... on ReleaseGroup {
                        title
                        firstReleaseDate
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Schema

See the [GraphQL schema][schema].

[demo]: https://graphbrainz.herokuapp.com/
[Express]: http://expressjs.com/
[MusicBrainz]: https://musicbrainz.org/
[GraphQL]: http://graphql.org/
[express-graphql]: https://www.npmjs.com/package/express-graphql
[dotenv]: https://www.npmjs.com/package/dotenv
[debug]: https://www.npmjs.com/package/debug
[GraphiQL]: https://github.com/graphql/graphiql
[schema]: schema.md
