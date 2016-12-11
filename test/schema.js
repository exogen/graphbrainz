import test from 'ava'
import { graphql } from 'graphql'
import schema from '../src/schema'
import context from './helpers/context'

function testData (t, query, handler) {
  return graphql(schema, query, null, context).then(result => {
    t.is(result.errors, undefined)
    return handler(t, result.data)
  })
}

function testError (t, query, handler) {
  return graphql(schema, query, null, context).then(result => {
    t.truthy(result.errors)
    t.true(result.errors.length > 0)
    return handler(t, result.errors)
  })
}

test('schema has a node field', testData, `
  {
    node(id: "UmVsZWFzZUdyb3VwOmUzN2QyNzQwLTQ1MDMtNGUzZi1hYjZkLWU2MjJhMjVlOTY0ZA==") {
      __typename
      ... on ReleaseGroup {
        mbid
      }
    }
  }
`, (t, data) => {
  t.deepEqual(data, {
    node: {
      __typename: 'ReleaseGroup',
      mbid: 'e37d2740-4503-4e3f-ab6d-e622a25e964d'
    }
  })
})

test('schema has a lookup query', testData, `
  {
    lookup {
      artist (mbid: "c8da2e40-bd28-4d4e-813a-bd2f51958ba8") {
        mbid
        name
        type
      }
    }
  }
`, (t, data) => {
  t.deepEqual(data, {
    lookup: {
      artist: {
        mbid: 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8',
        name: 'Lures',
        type: 'Group'
      }
    }
  })
})

test('schema has a search query', testData, `
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
`, (t, data) => {
  const { recordings } = data.search
  t.true(recordings.totalCount > 0)
  t.true(recordings.edges.length === 25)
  recordings.edges.forEach(edge => t.true(edge.score > 0))
})

test('schema has a browse query', testData, `
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
`, (t, data) => {
  const { releaseGroups } = data.browse
  t.true(releaseGroups.totalCount > 0)
  t.true(releaseGroups.edges.length > 0)
  releaseGroups.edges.forEach(edge => t.truthy(edge.node.title))
})

test('supports deeply nested queries', testData, `
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
`, (t, data) => {
  const { labels } = data.search
  t.true(labels.edges.length > 0)
  t.is(labels.edges[0].node.releases.edges.length, 1)
})

test('throws an error if given a malformed MBID', testError, `
  {
    lookup {
      artist(mbid: "ABC123") {
        name
      }
    }
  }
`, (t, errors) => {
  const err = errors[0]
  t.true(err instanceof TypeError)
  t.is(err.message, 'Malformed MBID: ABC123')
})

test('Artist beginArea/endArea pulls from begin_area/end_area for lookup queries', testData, `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        beginArea {
          name
        }
        endArea {
          name
        }
      }
    }
  }
`, (t, data) => {
  const { artist } = data.lookup
  t.is(artist.beginArea.name, 'Westmount')
  t.is(artist.endArea.name, 'Los Angeles')
})

test('Artist beginArea/endArea pull from begin_area/end_area for browse queries', testData, `
  {
    browse {
      artists(area: "3f504d54-c40c-487d-bc16-c1990eac887f") {
        edges {
          node {
            beginArea {
              name
            }
            endArea {
              name
            }
          }
        }
      }
    }
  }
`, (t, data) => {
  const artists = data.browse.artists.edges.map(edge => edge.node)
  t.true(artists.length > 1)
  t.true(artists.some(artist => artist.beginArea))
  t.true(artists.some(artist => artist.endArea))
})

test('Artist beginArea/endArea pulls from begin-area/end-area for search queries', testData, `
  {
    search {
      artists(query: "Leonard Cohen", first: 1) {
        edges {
          node {
            beginArea {
              name
            }
            endArea {
              name
            }
          }
        }
      }
    }
  }
`, (t, data) => {
  const artists = data.search.artists.edges.map(edge => edge.node)
  t.true(artists.length === 1)
  t.is(artists[0].beginArea.name, 'Westmount')
  t.is(artists[0].endArea.name, 'Los Angeles')
})

test('relationships filter by type', testData, `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        relationships {
          artists(first: 5) {
            edges {
              node {
                target {
                  __typename
                }
                targetType
              }
            }
          }
          recordings(first: 5) {
            edges {
              node {
                target {
                  __typename
                }
                targetType
              }
            }
          }
          releases(first: 5) {
            edges {
              node {
                target {
                  __typename
                }
                targetType
              }
            }
          }
        }
      }
    }
  }
`, (t, data) => {
  const { relationships } = data.lookup.artist
  t.is(relationships.artists.edges.length, 5)
  relationships.artists.edges.forEach(edge => {
    t.is(edge.node.targetType, 'artist')
    t.is(edge.node.target.__typename, 'Artist')
  })
  t.is(relationships.recordings.edges.length, 5)
  relationships.recordings.edges.forEach(edge => {
    t.is(edge.node.targetType, 'recording')
    t.is(edge.node.target.__typename, 'Recording')
  })
  t.is(relationships.releases.edges.length, 5)
  relationships.releases.edges.forEach(edge => {
    t.is(edge.node.targetType, 'release')
    t.is(edge.node.target.__typename, 'Release')
  })
})

test('Area maps iso-3166-1-codes to isoCodes', testData, `
  {
    lookup {
      area(mbid: "489ce91b-6658-3307-9877-795b68554c98") {
        name
        isoCodes
      }
    }
  }
`, (t, data) => {
  t.deepEqual(data.lookup.area.isoCodes, ['US'])
})

test('Alias locales use the Locale scalar', testData, `
  {
    lookup {
      artist(mbid: "f99b7d67-4e63-4678-aa66-4c6ac0f7d24a") {
        aliases {
          name
          locale
        }
      }
    }
  }
`, (t, data) => {
  const { aliases } = data.lookup.artist
  t.is(aliases.find(alias => alias.locale === 'en').name, 'PSY')
  t.is(aliases.find(alias => alias.locale === 'ko').name, '싸이')
})

test('Work ISWCs use the ISWC scalar', testData, `
  {
    lookup {
      work(mbid: "ef7d0814-da6a-32f5-a600-ff81cffd1aed") {
        title
        iswcs
      }
    }
  }
`, (t, data) => {
  const { work } = data.lookup
  t.is(work.title, 'Song of the French Partisan')
  t.deepEqual(work.iswcs, ['T-900.755.682-3'])
})

test('URLs may be looked up by resource', testData, `
  {
    lookup {
      url(resource: "http://www.nirvana.com/") {
        mbid
        resource
      }
    }
  }
`, (t, data) => {
  const { url } = data.lookup
  t.is(url.mbid, '4347ffe2-82ec-4059-9520-6a1a3f73a304')
  t.is(url.resource, 'http://www.nirvana.com/')
})

test('throws an error if given a malformed URLString', testError, `
  {
    lookup {
      url(resource: "http:foo") {
        mbid
        resource
      }
    }
  }
`, (t, errors) => {
  const err = errors[0]
  t.true(err instanceof TypeError)
  t.is(err.message, 'Malformed URL: http:foo')
})

test('Release groups can be browsed by type', testData, `
  {
    browse {
      releaseGroups(artist: "5b11f4ce-a62d-471e-81fc-a69a8278c7da", type: EP) {
        edges {
          node {
            primaryType
          }
        }
      }
    }
  }
`, (t, data) => {
  const releaseGroups = data.browse.releaseGroups.edges.map(edge => edge.node)
  t.is(releaseGroups.length, 8)
  releaseGroups.forEach(releaseGroup => t.is(releaseGroup.primaryType, 'EP'))
})

test('Releases can be browsed by type and status', testData, `
  {
    browse {
      releases(artist: "5b11f4ce-a62d-471e-81fc-a69a8278c7da", type: EP, status: BOOTLEG) {
        edges {
          node {
            status
          }
        }
      }
    }
  }
`, (t, data) => {
  const releases = data.browse.releases.edges.map(edge => edge.node)
  t.is(releases.length, 6)
  releases.forEach(release => t.is(release.status, 'BOOTLEG'))
})

test('Releases have an ASIN field', testData, `
  {
    lookup {
      release(mbid: "d5cdb7fd-c7e9-460a-9549-8a369655cc52") {
        asin
      }
    }
  }
`, (t, data) => {
  const { release } = data.lookup
  t.is(release.asin, 'B01KN6XDS6')
})

test('Artists have a list of ISNIs and IPIs', testData, `
  {
    lookup {
      artist(mbid: "65314b12-0e08-43fa-ba33-baaa7b874c15") {
        ipis
        isnis
      }
    }
  }
`, (t, data) => {
  const { artist } = data.lookup
  t.deepEqual(artist.ipis, ['00006457004'])
  t.deepEqual(artist.isnis, ['0000000110273481'])
})

test('artistCredits is an alias for artistCredit', testData, `
  {
    lookup {
      recording(mbid: "07649758-09c8-4d70-bc6f-5c37ab36334d") {
        artistCredit {
          name
          joinPhrase
        }
        artistCredits {
          name
          joinPhrase
        }
      }
      release(mbid: "d5cdb7fd-c7e9-460a-9549-8a369655cc52") {
        artistCredit {
          name
          joinPhrase
        }
        artistCredits {
          name
          joinPhrase
        }
      }
      releaseGroup(mbid: "53614893-6f25-4519-9cae-b1db904e2887") {
        artistCredit {
          name
          joinPhrase
        }
        artistCredits {
          name
          joinPhrase
        }
      }
    }
  }
`, (t, data) => {
  const { recording, release, releaseGroup } = data.lookup
  t.deepEqual(recording.artistCredit, [
    { name: 'Holly Golightly', joinPhrase: ' & ' },
    { name: 'The Brokeoffs', joinPhrase: '' }
  ])
  t.deepEqual(recording.artistCredits, recording.artistCredit)

  t.deepEqual(release.artistCredit, [
    { name: 'Leonard Cohen', joinPhrase: '' }
  ])
  t.deepEqual(release.artistCredits, release.artistCredit)

  t.deepEqual(releaseGroup.artistCredit, [
    { name: 'DJ Muggs', joinPhrase: ' vs. ' },
    { name: 'Ill Bill', joinPhrase: '' }
  ])
  t.deepEqual(releaseGroup.artistCredits, releaseGroup.artistCredit)
})
