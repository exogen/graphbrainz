import test from 'ava'
import MusicBrainz, { MusicBrainzError } from '../../src/api'
import client from '../helpers/client/musicbrainz'

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

test('shouldRetry() retries only 5xx responses from MusicBrainz', t => {
  t.true(client.shouldRetry(new MusicBrainzError('error', 500)))
  t.true(client.shouldRetry(new MusicBrainzError('error', 501)))
  t.true(client.shouldRetry(new MusicBrainzError('error', 598)))
  t.true(client.shouldRetry(new MusicBrainzError('error', 599)))
  t.false(client.shouldRetry(new MusicBrainzError('error', 404)))
  t.false(client.shouldRetry(new MusicBrainzError('error', 499)))
  t.false(client.shouldRetry(new MusicBrainzError('error', 600)))
})

test('shouldRetry() retries only transient local connection issues', t => {
  t.true(client.shouldRetry({ code: 'ECONNRESET' }))
  t.true(client.shouldRetry({ code: 'ENOTFOUND' }))
  t.true(client.shouldRetry({ code: 'ESOCKETTIMEDOUT' }))
  t.true(client.shouldRetry({ code: 'ETIMEDOUT' }))
  t.true(client.shouldRetry({ code: 'ECONNREFUSED' }))
  t.true(client.shouldRetry({ code: 'EHOSTUNREACH' }))
  t.true(client.shouldRetry({ code: 'EPIPE' }))
  t.true(client.shouldRetry({ code: 'EAI_AGAIN' }))
  t.false(client.shouldRetry({ code: 'ENOENT' }))
  t.false(client.shouldRetry({ code: 'EACCES' }))
  t.false(client.shouldRetry({ code: 'EPERM' }))
})

test('rejects non-MusicBrainz errors', t => {
  const client = new MusicBrainz({ baseURL: '$!@#$' })
  t.throws(client.get('artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da'), Error)
})

test('uses the default error impementation if there is no JSON error', t => {
  t.is(client.parseErrorMessage({ statusCode: 501 }, 'yikes'), 'yikes')
  t.is(client.parseErrorMessage({ statusCode: 500 }, {}), '500')
  t.is(client.parseErrorMessage({ statusCode: 404 }, null), '404')
})
