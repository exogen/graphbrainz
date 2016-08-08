/* global describe, it */
import { expect } from 'chai'
import RateLimit from '../src/rate-limit'

describe('RateLimit', () => {
  it('defaults to 1 request per second', () => {
    const limiter = new RateLimit()
    expect(limiter.limit).to.equal(1)
    expect(limiter.period).to.equal(1000)
  })
})
