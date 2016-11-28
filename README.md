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
  - [Pagination](#pagination)
- [Questions](#questions)
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
  [client submodule](src/api.js) for help with creating a custom instance. You
  probably only need to do this if you want to adjust the rate limit and retry
  behavior.
* Any remaining options are passed along to the standard GraphQL middleware.
  See the [express-graphql][] documentation for more information.

### Environment Variables

* **`MUSICBRAINZ_BASE_URL`**: The base MusicBrainz API URL to use. Change this
  if you are running your own MusicBrainz mirror. Defaults to `http://musicbrainz.org/ws/2/`.
* **`GRAPHBRAINZ_PATH`**: The URL route at which to expose the GraphQL endpoint,
  if running the standalone server. Defaults to `/`.
* **`GRAPHBRAINZ_CACHE_SIZE`**: The maximum number of REST API responses to
  cache. Increasing the cache size and TTL will greatly lower query execution
  time for complex queries involving frequently accessed entities. Defaults to
  `8192`.
* **`GRAPHBRAINZ_CACHE_TTL`**: The maximum age of REST API responses in the
  cache, in milliseconds. Responses older than this will be disposed of (and
  re-requested) the next time they are accessed. Defaults to `86400000` (one
  day).
* **`GRAPHBRAINZ_GRAPHIQL`**: Set this to `true` if you want to force the
  [GraphiQL][] interface to be available even in production mode.
* **`PORT`**: Port number to use, if running the standalone server.

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

Nirvana albums and each album’s singles ([try it](https://graphbrainz.herokuapp.com/?query=query%20NirvanaAlbumSingles%20%7B%0A%20%20lookup%20%7B%0A%20%20%20%20artist(mbid%3A%20%225b11f4ce-a62d-471e-81fc-a69a8278c7da%22)%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20releaseGroups(type%3A%20ALBUM)%20%7B%0A%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%20%20firstReleaseDate%0A%20%20%20%20%20%20%20%20%20%20%20%20relationships%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20releaseGroups(type%3A%20%22single%20from%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20target%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20ReleaseGroup%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20firstReleaseDate%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=NirvanaAlbumSingles)):

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

The first five labels with “Apple” in the name ([try it](https://graphbrainz.herokuapp.com/?query=query%20AppleLabels%20%7B%0A%20%20search%20%7B%0A%20%20%20%20labels(query%3A%20%22Apple%22%2C%20first%3A%205)%20%7B%0A%20%20%20%20%20%20...labelResults%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20labelResults%20on%20LabelConnection%20%7B%0A%20%20pageInfo%20%7B%0A%20%20%20%20endCursor%0A%20%20%7D%0A%20%20edges%20%7B%0A%20%20%20%20cursor%0A%20%20%20%20node%20%7B%0A%20%20%20%20%20%20mbid%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20area%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=AppleLabels)):

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

…and the next five, using the `endCursor` from the previous result ([try it](https://graphbrainz.herokuapp.com/?query=query%20AppleLabels%20%7B%0A%20%20search%20%7B%0A%20%20%20%20labels(query%3A%20%22Apple%22%2C%20first%3A%205%2C%20after%3A%20%22YXJyYXljb25uZWN0aW9uOjQ%3D%22)%20%7B%0A%20%20%20%20%20%20...labelResults%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20labelResults%20on%20LabelConnection%20%7B%0A%20%20pageInfo%20%7B%0A%20%20%20%20endCursor%0A%20%20%7D%0A%20%20edges%20%7B%0A%20%20%20%20cursor%0A%20%20%20%20node%20%7B%0A%20%20%20%20%20%20mbid%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20type%0A%20%20%20%20%20%20area%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=AppleLabels)):

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
([try it](https://graphbrainz.herokuapp.com/?query=query%20AppleRecordsMarriages%20%7B%0A%20%20search%20%7B%0A%20%20%20%20labels(query%3A%20%22Apple%20Records%22%2C%20first%3A%201)%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20disambiguation%0A%20%20%20%20%20%20%20%20%20%20country%0A%20%20%20%20%20%20%20%20%20%20releases(first%3A%201)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20date%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20artists%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20...bandMembers%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20bandMembers%20on%20Artist%20%7B%0A%20%20relationships%20%7B%0A%20%20%20%20artists(direction%3A%20%22backward%22%2C%20type%3A%20%22member%20of%20band%22)%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20target%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20Artist%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20...marriages%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Afragment%20marriages%20on%20Artist%20%7B%0A%20%20relationships%20%7B%0A%20%20%20%20artists(type%3A%20%22married%22)%20%7B%0A%20%20%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20direction%0A%20%20%20%20%20%20%20%20%20%20begin%0A%20%20%20%20%20%20%20%20%20%20end%0A%20%20%20%20%20%20%20%20%20%20target%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20...%20on%20Artist%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&operationName=AppleRecordsMarriages)):

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

## Questions

**What’s with the cumbersome `edges`/`node` nesting? Why `first`/`after`
instead of `limit`/`offset`? Why `mbid` instead of `id`?**

You can thank [Relay][] for that; these are properties of a Relay-compliant
schema. The schema was originally designed to be more user-friendly, but in the
end I decided that being compatible with Relay was a worthwhile feature. I
agree, it’s ugly.

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
[Relay]: https://facebook.github.io/relay/
[schema]: schema.md
