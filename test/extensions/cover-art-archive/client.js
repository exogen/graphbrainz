import test from 'ava';
import client from '../../helpers/client/cover-art-archive.js';

test('can retrieve a front image URL', async (t) => {
  const url = await client.imageURL(
    'release',
    '76df3287-6cda-33eb-8e9a-044b5e15ffdd',
    'front'
  );

  t.is(
    url,
    'http://archive.org/download/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd-829521842.jpg'
  );
});

test('can retrieve a back image URL', async (t) => {
  const url = await client.imageURL(
    'release',
    '76df3287-6cda-33eb-8e9a-044b5e15ffdd',
    'back'
  );

  t.is(
    url,
    'http://archive.org/download/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd-5769317885.jpg'
  );
});

test('can retrieve a list of release images', async (t) => {
  const data = await client.images(
    'release',
    '76df3287-6cda-33eb-8e9a-044b5e15ffdd'
  );

  t.is(
    data.release,
    'https://musicbrainz.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd'
  );
  t.true(data.images.length >= 3);
  data.images.forEach((image) => {
    t.true(image.approved);
    t.truthy(image.image);
    t.truthy(image.id);
    t.truthy(image.thumbnails.small);
    t.truthy(image.thumbnails.large);
  });
  t.true(data.images.some((image) => image.front));
  t.true(data.images.some((image) => image.back));
  t.true(data.images.some((image) => image.types.indexOf('Front') !== -1));
  t.true(data.images.some((image) => image.types.indexOf('Back') !== -1));
  t.true(data.images.some((image) => image.types.indexOf('Medium') !== -1));
});

test('throws an error if given an invalid MBID', (t) => {
  return t.throwsAsync(client.images('release', 'xyz'), {
    name: 'CoverArtArchiveError',
    message: 'Bad Request: invalid MBID specified',
  });
});

test('uses the default error impementation if there is no HTML error', (t) => {
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
      body: '',
    },
  };
  t.is(client.parseErrorMessage(error), error);
  error = {
    name: 'HTTPError',
    response: {
      statusCode: 500,
      body: null,
    },
  };
  t.is(client.parseErrorMessage(error), error);
});
