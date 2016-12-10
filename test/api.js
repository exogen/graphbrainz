import test from 'ava'
import { MusicBrainzError } from '../src/api'
import client from './helpers/client'

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
  const req = client.lookup('artist', '5b11f4ce-a62d-471e-81fc-a69a8278c7da', {
    inc: ['foobar']
  })
  return t.throws(req, MusicBrainzError)
})
