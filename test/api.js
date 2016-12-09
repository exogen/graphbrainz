import path from 'path'
import test from 'ava'
import sepia from 'sepia'
import MusicBrainz, { MusicBrainzError } from '../src/api'

sepia.fixtureDir(path.join(__dirname, 'fixtures'))

let client

test.before(t => {
  client = new MusicBrainz()
})

test('getLookupURL() generates a lookup URL', t => {
  t.is(client.getLookupURL('artist', 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8', {
    inc: ['recordings', 'release-groups']
  }), 'artist/c8da2e40-bd28-4d4e-813a-bd2f51958ba8?inc=recordings%2Brelease-groups')
})

test('getBrowseURL() generates a browse URL', t => {
  t.is(client.getBrowseURL('recording', {
    artist: 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8',
    limit: null,
    offset: 0
  }), 'recording?artist=c8da2e40-bd28-4d4e-813a-bd2f51958ba8&offset=0')
})

test('getSearchURL() generates a search URL', t => {
  t.is(client.getSearchURL('artist', 'Lures', { inc: null }), 'artist?query=Lures')
})

test('lookup() sends a lookup query', t => {
  return client.lookup('artist', 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8').then(response => {
    t.is(response.id, 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8')
    t.is(response.type, 'Group')
  })
})

test('rejects the promise when the API returns an error', t => {
  t.throws(
    client.lookup('artist', '5b11f4ce-a62d-471e-81fc-a69a8278c7da', {
      inc: ['foobar']
    }), MusicBrainzError
  )
})
