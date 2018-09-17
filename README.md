# GraphBrainz

[![build status](https://img.shields.io/travis/exogen/graphbrainz/master.svg)](https://travis-ci.org/exogen/graphbrainz)
[![coverage](https://img.shields.io/codecov/c/github/exogen/graphbrainz.svg)](https://codecov.io/gh/exogen/graphbrainz)
[![npm version](https://img.shields.io/npm/v/graphbrainz.svg)](https://www.npmjs.com/package/graphbrainz)
[![license](https://img.shields.io/npm/l/graphbrainz.svg)](https://github.com/exogen/graphbrainz/blob/master/LICENSE)

A [GraphQL][] schema, [Express][] server, and middleware for querying the
[MusicBrainz][] API. It features an [extensible](./docs/extensions) schema to
add integration with Discogs, Spotify, Last.fm, fanart.tv, and more!

```sh
npm install graphbrainz --save
```

**[Try out the live demo!][demo]** :bulb: Use the “Docs” sidebar, the
[schema][], or the [types][] docs to help construct your query.

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Usage](#usage)
  - [As a standalone server](#as-a-standalone-server)
  - [As middleware](#as-middleware)
  - [As a client](#as-a-client)
  - [Environment Variables](#environment-variables)
  - [Debugging](#debugging)
- [Example Queries](#example-queries)
  - [Pagination](#pagination)
- [Questions](#questions)
- [Schema](#schema)
  - [Extending the schema](#extending-the-schema)

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

- **`client`**: A custom API client instance to use. See the
  [client submodule](src/api/client.js) for help with creating a custom instance.
  You probably only need to do this if you want to adjust the rate limit and retry
  behavior.
- Any remaining options are passed along to the standard GraphQL middleware.
  See the [express-graphql][] documentation for more information.

### As a client

If you just want to make queries from your app without running a separate server
or exposing a GraphQL endpoint, use the GraphBrainz schema with a library like
[GraphQL.js][graphql-js]. You just need to create the `context` object that the
GraphBrainz resolvers expect, like so:

```js
import { graphql } from 'graphql'
import { MusicBrainz } from 'graphbrainz/lib/api'
import createContext from 'graphbrainz/lib/context'
import schema from 'graphbrainz/lib/schema'

const client = new MusicBrainz()
const context = createContext({ client })

graphql(
  schema,
  `
    {
      lookup {
        releaseGroup(mbid: "99599db8-0e36-4a93-b0e8-350e9d7502a9") {
          title
        }
      }
    }
  `,
  null,
  context
)
  .then(result => {
    const { releaseGroup } = result.data.lookup
    console.log(`The album title is “${releaseGroup.title}”.`)
  })
  .catch(err => {
    console.error(err)
  })
```

### Environment Variables

- **`MUSICBRAINZ_BASE_URL`**: The base MusicBrainz API URL to use. Change this
  if you are running your own MusicBrainz mirror. Defaults to `http://musicbrainz.org/ws/2/`.
- **`GRAPHBRAINZ_PATH`**: The URL route at which to expose the GraphQL endpoint,
  if running the standalone server. Defaults to `/`.
- **`GRAPHBRAINZ_CORS_ORIGIN`**: The value of the `origin` option to pass to the
  [CORS][cors] middleware. Valid values are `true` to reflect the request
  origin, a specific origin string to allow, `*` to allow all origins, and
  `false` to disable CORS (the default).
- **`GRAPHBRAINZ_CACHE_SIZE`**: The maximum number of REST API responses to
  cache. Increasing the cache size and TTL will greatly lower query execution
  time for complex queries involving frequently accessed entities. Defaults to
  `8192`.
- **`GRAPHBRAINZ_CACHE_TTL`**: The maximum age of REST API responses in the
  cache, in milliseconds. Responses older than this will be disposed of (and
  re-requested) the next time they are accessed. Defaults to `86400000` (one
  day).
- **`GRAPHBRAINZ_GRAPHIQL`**: Set this to `true` if you want to force the
  [GraphiQL][] interface to be available even in production mode.
- **`GRAPHBRAINZ_EXTENSIONS`**: A JSON array of module paths to load as
  [extensions](./docs/extensions).
- **`PORT`**: Port number to use, if running the standalone server.

When running the standalone server, [dotenv][] is used to load these variables
from a `.env` file, if one exists in the current working directory. This just
makes it more convenient to launch the server with certain settings. See the
[dotenv][] package for more information.

### Debugging

The `DEBUG` environment variable can be used to enable logging for all (or just
some) of this package’s submodules:

```sh
$ DEBUG=graphbrainz:* graphbrainz
```

See the [debug][] package for more information.

## Example Queries

Nirvana albums and each album’s singles ([try it](<https://graphbrainz.herokuapp.com/?query=query%20NirvanaAlbumSingles%20%7B%0A%20%20lookup%20%7B%0A%20%20%20%20artist(mbid%3A%20%225b11f4ce-a62d-471e-81fc-a69a8278c7da%22)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20releaseGroups(type%3A%20ALBUM)%20%7B%0A%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%20%20firstReleaseDate%0A%20%20%20%20%20%20%20%20%20%20%20%20relationships%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20releaseGroups(type%3A%20%22single%20from%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20target%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20ReleaseGroup%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20firstReleaseDate%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=NirvanaAlbumSingles>)):

```graphql
query NirvanaAlbumSingles {
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

### Pagination

The first five labels with “Apple” in the name ([try it](<https://graphbrainz.herokuapp.com/?query=query%20AppleLabels%20%7B%0A%20%20search%20%7B%0A%20%20%20%20labels(query%3A%20%22Apple%22%2C%20first%3A%205)%20%7B%0A%20%20%20%20%20%20...labelResults%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20labelResults%20on%20LabelConnection%20%7B%0A%20%20pageInfo%20%7B%0A%20%20%20%20endCursor%0A%20%20%7D%0A%20%20edges%20%7B%0A%20%20%20%20cursor%0A%20%20%20%20node%20%7B%0A%20%20%20%20%20%20mbid%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20area%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=AppleLabels>)):

```graphql
query AppleLabels {
  search {
    labels(query: "Apple", first: 5) {
      ...labelResults
    }
  }
}

fragment labelResults on LabelConnection {
  pageInfo {
    endCursor
  }
  edges {
    cursor
    node {
      mbid
      name
      type
      area {
        name
      }
    }
  }
}
```

…and the next five, using the `endCursor` from the previous result ([try it](<https://graphbrainz.herokuapp.com/?query=query%20AppleLabels%20%7B%0A%20%20search%20%7B%0A%20%20%20%20labels(query%3A%20%22Apple%22%2C%20first%3A%205%2C%20after%3A%20%22YXJyYXljb25uZWN0aW9uOjQ%3D%22)%20%7B%0A%20%20%20%20%20%20...labelResults%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20labelResults%20on%20LabelConnection%20%7B%0A%20%20pageInfo%20%7B%0A%20%20%20%20endCursor%0A%20%20%7D%0A%20%20edges%20%7B%0A%20%20%20%20cursor%0A%20%20%20%20node%20%7B%0A%20%20%20%20%20%20mbid%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20area%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=AppleLabels>)):

```graphql
query AppleLabels {
  search {
    labels(query: "Apple", first: 5, after: "YXJyYXljb25uZWN0aW9uOjQ=") {
      ...labelResults
    }
  }
}
```

Who the members of the band on an Apple Records release married, and when
([try it](<https://graphbrainz.herokuapp.com/?query=query%20AppleRecordsMarriages%20%7B%0A%20%20search%20%7B%0A%20%20%20%20labels(query%3A%20%22Apple%20Records%22%2C%20first%3A%201)%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20disambiguation%0A%20%20%20%20%20%20%20%20%20%20country%0A%20%20%20%20%20%20%20%20%20%20releases(first%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20artists%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20...bandMembers%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20bandMembers%20on%20Artist%20%7B%0A%20%20relationships%20%7B%0A%20%20%20%20artists(direction%3A%20%22backward%22%2C%20type%3A%20%22member%20of%20band%22)%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20target%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20Artist%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20...marriages%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20marriages%20on%20Artist%20%7B%0A%20%20relationships%20%7B%0A%20%20%20%20artists(type%3A%20%22married%22)%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20direction%0A%20%20%20%20%20%20%20%20%20%20begin%0A%20%20%20%20%20%20%20%20%20%20end%0A%20%20%20%20%20%20%20%20%20%20target%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20Artist%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=AppleRecordsMarriages>)):

```graphql
query AppleRecordsMarriages {
  search {
    labels(query: "Apple Records", first: 1) {
      edges {
        node {
          name
          disambiguation
          country
          releases(first: 1) {
            edges {
              node {
                title
                date
                artists {
                  edges {
                    node {
                      name
                      ...bandMembers
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

fragment bandMembers on Artist {
  relationships {
    artists(direction: "backward", type: "member of band") {
      edges {
        node {
          type
          target {
            ... on Artist {
              name
              ...marriages
            }
          }
        }
      }
    }
  }
}

fragment marriages on Artist {
  relationships {
    artists(type: "married") {
      edges {
        node {
          type
          direction
          begin
          end
          target {
            ... on Artist {
              name
            }
          }
        }
      }
    }
  }
}
```

Images of Tom Petty provided by various extensions ([try it](<https://graphbrainz.herokuapp.com/?query=query%20TomPettyImages%20%7B%0A%20%20lookup%20%7B%0A%20%20%20%20artist(mbid%3A%20%225ca3f318-d028-4151-ac73-78e2b2d6cdcc%22)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20mediaWikiImages%20%7B%0A%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20objectName%0A%20%20%20%20%20%20%20%20descriptionHTML%0A%20%20%20%20%20%20%20%20licenseShortName%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20fanArt%20%7B%0A%20%20%20%20%20%20%20%20thumbnails%20%7B%0A%20%20%20%20%20%20%20%20%20%20url%0A%20%20%20%20%20%20%20%20%20%20likeCount%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20theAudioDB%20%7B%0A%20%20%20%20%20%20%20%20logo%0A%20%20%20%20%20%20%20%20biography%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=TomPettyImages>)):

```graphql
query TomPettyImages {
  lookup {
    artist(mbid: "5ca3f318-d028-4151-ac73-78e2b2d6cdcc") {
      name
      mediaWikiImages {
        url
        objectName
        descriptionHTML
        licenseShortName
      }
      fanArt {
        thumbnails {
          url
          likeCount
        }
      }
      theAudioDB {
        logo
        biography
      }
    }
  }
}
```

You can find more example queries in the [schema tests][].

## Questions

**What’s with the cumbersome `edges`/`node` nesting? Why `first`/`after`
instead of `limit`/`offset`? Why `mbid` instead of `id`?**

You can thank [Relay][] for that; these are properties of a Relay-compliant
schema. The schema was originally designed to be more user-friendly, but in the
end I decided that being compatible with Relay was a worthwhile feature. I
agree, it’s ugly.

The GraphBrainz schema includes an extra `nodes` field on every connection type.
If you only want the nodes and no other fields on `edges`, you can use `nodes`
as a shortcut.

Don’t forget that you can also use [GraphQL aliases][aliases] to rename fields
to your liking. For example, the following query renames `edges`, `node`, and
`mbid` to `results`, `releaseGroup`, and `id`, respectively:

```graphql
query ChristmasAlbums {
  search {
    releaseGroups(query: "Christmas") {
      results: edges {
        releaseGroup: node {
          id: mbid
          title
        }
      }
    }
  }
}
```

**Why does my query take so long?**

It’s likely that your query requires multiple round trips to the MusicBrainz
REST API, which is subject to [rate limiting][]. While the query resolver tries
very hard to fetch only the data necessary, and with the smallest number of
API requests, it is not 100% optimal (yet). Make sure you are only requesting
the fields you need and a reasonable level of nested entities – unless you are
willing to wait.

You can also set up a [local MusicBrainz mirror][mirror] and configure
GraphBrainz to use that with no rate limiting.

## Schema

The [types][] document is the easiest to browse representation of the schema, or
you can read the [schema in GraphQL syntax][schema].

### Extending the schema

The GraphBrainz schema can easily be extended to add integrations with
third-party services. See the [Extensions](./docs/extensions) docs for more
info.

[demo]: https://graphbrainz.herokuapp.com/
[express]: http://expressjs.com/
[musicbrainz]: https://musicbrainz.org/
[graphql]: http://graphql.org/
[express-graphql]: https://www.npmjs.com/package/express-graphql
[dotenv]: https://www.npmjs.com/package/dotenv
[debug]: https://www.npmjs.com/package/debug
[graphiql]: https://github.com/graphql/graphiql
[graphql-js]: https://github.com/graphql/graphql-js
[relay]: https://facebook.github.io/relay/
[schema]: docs/schema.md
[types]: docs/types.md
[rate limiting]: https://musicbrainz.org/doc/XML_Web_Service/Rate_Limiting
[mirror]: https://musicbrainz.org/doc/MusicBrainz_Server/Setup
[aliases]: http://graphql.org/learn/queries/#aliases
[schema tests]: test/_schema.js
[cors]: https://github.com/expressjs/cors
