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
