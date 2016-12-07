import path from 'path'
import test from 'ava'
import sepia from 'sepia'
import { graphql } from 'graphql'
import MusicBrainz from '../src/api'
import schema from '../src/schema'
import createLoaders from '../src/loaders'

sepia.fixtureDir(path.join(__dirname, 'fixtures'))

test.beforeEach(t => {
  const client = new MusicBrainz()
  const loaders = createLoaders(client)
  t.context = { client, loaders }
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
  return graphql(schema, query, null, t.context).then(result => {
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
  return graphql(schema, query, null, t.context).then(result => {
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
  return graphql(schema, query, null, t.context).then(result => {
    const { releaseGroups } = result.data.browse
    t.true(releaseGroups.totalCount > 0)
    t.true(releaseGroups.edges.length > 0)
    releaseGroups.edges.forEach(edge => t.truthy(edge.node.title))
  })
})
