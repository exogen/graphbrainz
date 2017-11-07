import test from 'ava'
import client from '../../helpers/client/cover-art-archive'

test('can retrieve a front image URL', t => {
  return client
    .imageURL('release', '76df3287-6cda-33eb-8e9a-044b5e15ffdd', 'front')
    .then(url => {
      t.is(
        url,
        'http://archive.org/download/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd-829521842.jpg'
      )
    })
})

test('can retrieve a back image URL', t => {
  return client
    .imageURL('release', '76df3287-6cda-33eb-8e9a-044b5e15ffdd', 'back')
    .then(url => {
      t.is(
        url,
        'http://archive.org/download/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd/mbid-76df3287-6cda-33eb-8e9a-044b5e15ffdd-5769317885.jpg'
      )
    })
})

test('can retrieve a list of release images', t => {
  return client
    .images('release', '76df3287-6cda-33eb-8e9a-044b5e15ffdd')
    .then(data => {
      t.is(
        data.release,
        'http://musicbrainz.org/release/76df3287-6cda-33eb-8e9a-044b5e15ffdd'
      )
      t.true(data.images.length >= 3)
      data.images.forEach(image => {
        t.true(image.approved)
        t.truthy(image.image)
        t.truthy(image.id)
        t.truthy(image.thumbnails.small)
        t.truthy(image.thumbnails.large)
      })
      t.true(data.images.some(image => image.front))
      t.true(data.images.some(image => image.back))
      t.true(data.images.some(image => image.types.indexOf('Front') !== -1))
      t.true(data.images.some(image => image.types.indexOf('Back') !== -1))
      t.true(data.images.some(image => image.types.indexOf('Medium') !== -1))
    })
})

test('throws an error if given an invalid MBID', t => {
  return t.throws(client.images('release', 'xyz'), client.errorClass)
})

test('uses the default error impementation if there is no HTML error', t => {
  t.is(client.parseErrorMessage({ statusCode: 501 }, 'yikes'), 'yikes')
  t.is(client.parseErrorMessage({ statusCode: 500 }, ''), '500')
  t.is(client.parseErrorMessage({ statusCode: 404 }, null), '404')
})
