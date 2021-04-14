import test from 'ava';
import RateLimit from '../src/rate-limit.js';

test('defaults to 1 request per second', (t) => {
  const limiter = new RateLimit();
  t.is(limiter.limit, 1);
  t.is(limiter.period, 1000);
});

test('concurrency defaults to limit', (t) => {
  let limiter = new RateLimit();
  t.is(limiter.concurrency, 1);
  limiter = new RateLimit({ limit: 5 });
  t.is(limiter.concurrency, 5);
});
