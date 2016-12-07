import path from 'path'
import test from 'ava'
import sepia from 'sepia'
import MusicBrainz from '../src/api'

sepia.fixtureDir(path.join(__dirname, 'fixtures'))

test.beforeEach(t => {
  t.context.client = new MusicBrainz()
})

test('getLookupURL() generates a lookup URL', t => {
  const { client } = t.context
  t.is(client.getLookupURL('artist', 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8', {
    inc: ['recordings', 'release-groups']
  }), 'artist/c8da2e40-bd28-4d4e-813a-bd2f51958ba8?inc=recordings%2Brelease-groups')
})

test('getBrowseURL() generates a browse URL', t => {
  const { client } = t.context
  t.is(client.getBrowseURL('recording', {
    artist: 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8',
    limit: null,
    offset: 0
  }), 'recording?artist=c8da2e40-bd28-4d4e-813a-bd2f51958ba8&offset=0')
})

test('getSearchURL() generates a search URL', t => {
  const { client } = t.context
  t.is(client.getSearchURL('artist', 'Lures', { inc: null }), 'artist?query=Lures')
})

test('lookup() sends a lookup query', t => {
  const { client } = t.context
  return client.lookup('artist', 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8').then(response => {
    t.is(response.id, 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8')
    t.is(response.type, 'Group')
  })
})
