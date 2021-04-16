import test from 'ava';
import MusicBrainz from '../../src/api/index.js';
import client from '../helpers/client/musicbrainz.js';

test('getLookupURL() generates a lookup URL', (t) => {
  t.is(
    client.getLookupURL('artist', 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8', {
      inc: ['recordings', 'release-groups'],
    }),
    'artist/c8da2e40-bd28-4d4e-813a-bd2f51958ba8?inc=recordings%2Brelease-groups'
  );
});

test('getBrowseURL() generates a browse URL', (t) => {
  t.is(
    client.getBrowseURL('recording', {
      artist: 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8',
      limit: null,
      offset: 0,
    }),
    'recording?artist=c8da2e40-bd28-4d4e-813a-bd2f51958ba8&offset=0'
  );
});

test('getSearchURL() generates a search URL', (t) => {
  t.is(
    client.getSearchURL('artist', 'Lures', { inc: null }),
    'artist?query=Lures'
  );
});

test('lookup() sends a lookup query', async (t) => {
  const response = await client.lookup(
    'artist',
    'c8da2e40-bd28-4d4e-813a-bd2f51958ba8'
  );

  t.is(response.id, 'c8da2e40-bd28-4d4e-813a-bd2f51958ba8');
  t.is(response.type, 'Group');
});

test('rejects the promise when the API returns an error', (t) => {
  const req = client.lookup('artist', '5b11f4ce-a62d-471e-81fc-a69a8278c7da', {
    inc: ['foobar'],
  });
  return t.throwsAsync(req, {
    name: 'MusicBrainzError',
    message: 'foobar is not a valid inc parameter for the artist resource.',
  });
});

test('rejects non-MusicBrainz errors', (t) => {
  const client = new MusicBrainz({ baseURL: '$!@#$' });
  return t.throwsAsync(
    client.get('artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da'),
    {
      name: 'TypeError',
    }
  );
});

test('uses the default error impementation if there is no JSON error', (t) => {
  let error = {
    name: 'HTTPError',
    response: {
      statusCode: 501,
      body: 'yikes',
    },
  };
  t.is(client.parseErrorMessage(error), error);
  error = {
    name: 'HTTPError',
    response: {
      statusCode: 500,
      body: {},
    },
  };
  t.is(client.parseErrorMessage(error), error);
  error = {
    name: 'HTTPError',
    response: {
      statusCode: 404,
      body: null,
    },
  };
  t.is(client.parseErrorMessage(error), error);
});
