import test from 'ava'
import Client from '../../src/api/client'

test('parseErrorMessage() returns the body or status code', t => {
  const client = new Client()
  t.is(
    client.parseErrorMessage({ statusCode: 500 }, 'something went wrong'),
    'something went wrong'
  )
  t.is(client.parseErrorMessage({ statusCode: 500 }, ''), '500')
  t.is(client.parseErrorMessage({ statusCode: 404 }, {}), '404')
})
