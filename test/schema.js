import path from 'path'
import test from 'ava'
import sepia from 'sepia'
import { graphql } from 'graphql'
import MusicBrainz from '../src/api'
import schema from '../src/schema'
import createLoaders from '../src/loaders'

sepia.fixtureDir(path.join(__dirname, 'fixtures'))

let client
let loaders
let context

test.before(t => {
  client = new MusicBrainz()
  loaders = createLoaders(client)
  context = { client, loaders }
})

test('schema has a node field', t => {
  const query = `
    {
      node(id: "UmVsZWFzZUdyb3VwOmUzN2QyNzQwLTQ1MDMtNGUzZi1hYjZkLWU2MjJhMjVlOTY0ZA==") {
        __typename
        ... on ReleaseGroup {
          mbid
        }
      }
    }
  `
  return graphql(schema, query, null, context).then(result => {
    t.deepEqual(result, {
      data: {
        node: {
          __typename: 'ReleaseGroup',
          mbid: 'e37d2740-4503-4e3f-ab6d-e622a25e964d'
        }
      }
    })
  })
})

test('schema has a lookup query', t => {
  const query = `
    {
      lookup {
        artist (mbid: "c8da2e40-bd28-4d4e-813a-bd2f51958ba8") {
          mbid
          name
          type
        }
      }
    }
  `
  return graphql(schema, query, null, context).then(result => {
    t.deepEqual(result, {
      data: {
        lookup: {
          artist: {
            mbid: 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8',
            name: 'Lures',
            type: 'Group'
          }
        }
      }
    })
  })
})

test('schema has a search query', t => {
  const query = `
    {
      search {
        recordings (query: "Burn the Witch") {
          totalCount
          edges {
            score
            node {
              mbid
              title
            }
          }
        }
      }
    }
  `
  return graphql(schema, query, null, context).then(result => {
    const { recordings } = result.data.search
    t.true(recordings.totalCount > 0)
    t.true(recordings.edges.length === 25)
    recordings.edges.forEach(edge => t.true(edge.score > 0))
  })
})

test('schema has a browse query', t => {
  const query = `
    {
      browse {
        releaseGroups (artist: "c8da2e40-bd28-4d4e-813a-bd2f51958ba8") {
          totalCount
          edges {
            node {
              mbid
              title
              artistCredit {
                artist {
                  mbid
                }
                name
                joinPhrase
              }
            }
          }
        }
      }
    }
  `
  return graphql(schema, query, null, context).then(result => {
    const { releaseGroups } = result.data.browse
    t.true(releaseGroups.totalCount > 0)
    t.true(releaseGroups.edges.length > 0)
    releaseGroups.edges.forEach(edge => t.truthy(edge.node.title))
  })
})

test('supports deeply nested queries', t => {
  const query = `
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
  `
  return graphql(schema, query, null, context).then(result => {
    const { labels } = result.data.search
    t.true(labels.edges.length > 0)
    t.is(labels.edges[0].node.releases.edges.length, 1)
  })
})
