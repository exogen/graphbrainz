import test from 'ava';
import Client from '../../src/api/client.js';

test('parseErrorMessage() returns the input error by default', (t) => {
  const client = new Client();
  const error = {
    name: 'HTTPError',
    response: {
      statusCode: 500,
      body: 'something went wrong',
    },
  };
  t.is(client.parseErrorMessage(error), error);
});
