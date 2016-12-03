const debug = require('debug')('graphbrainz:rate-limit')

export default class RateLimit {
  constructor ({
    limit = 1,
    period = 1000,
    concurrency = limit || 1,
    defaultPriority = 1
  } = {}) {
    this.limit = limit
    this.period = period
    this.defaultPriority = defaultPriority
    this.concurrency = concurrency
    this.queues = []
    this.numPending = 0
    this.periodStart = null
    this.periodCapacity = this.limit
    this.timer = null
    this.pendingFlush = false
    this.paused = false
    this.prevTaskID = null
  }

  nextTaskID (prevTaskID = this.prevTaskID) {
    const id = (prevTaskID || 0) + 1
    this.prevTaskID = id
    return id
  }

  pause () {
    clearTimeout(this.timer)
    this.paused = true
  }

  unpause () {
    this.paused = false
    this.flush()
  }

  clear () {
    this.queues.length = 0
  }

  enqueue (fn, args, priority = this.defaultPriority) {
    priority = Math.max(0, priority)
    return new Promise((resolve, reject) => {
      const queue = this.queues[priority] = this.queues[priority] || []
      const id = this.nextTaskID()
      debug(`Enqueuing task. id=${id} priority=${priority}`)
      queue.push({ fn, args, resolve, reject, id })
      if (!this.pendingFlush) {
        this.pendingFlush = true
        process.nextTick(() => {
          this.pendingFlush = false
          this.flush()
        })
      }
    })
  }

  dequeue () {
    let task
    for (let i = this.queues.length - 1; i >= 0; i--) {
      const queue = this.queues[i]
      if (queue && queue.length) {
        task = queue.shift()
      }
      if (!queue || !queue.length) {
        this.queues.length = i
      }
      if (task) {
        break
      }
    }
    return task
  }

  flush () {
    if (this.paused) {
      return
    }
    if (this.numPending < this.concurrency && this.periodCapacity > 0) {
      const task = this.dequeue()
      if (task) {
        const { resolve, reject, fn, args, id } = task
        if (this.timer == null) {
          const now = Date.now()
          let timeout = this.period
          if (this.periodStart != null) {
            const delay = now - (this.periodStart + timeout)
            if (delay > 0 && delay <= timeout) {
              timeout -= delay
            }
          }
          this.periodStart = now
          this.timer = setTimeout(() => {
            this.timer = null
            this.periodCapacity = this.limit
            this.flush()
          }, timeout)
        }
        this.numPending += 1
        this.periodCapacity -= 1
        const onResolve = (value) => {
          this.numPending -= 1
          resolve(value)
          this.flush()
        }
        const onReject = (err) => {
          this.numPending -= 1
          reject(err)
          this.flush()
        }
        debug(`Running task. id=${id}`)
        fn(...args).then(onResolve, onReject)
        this.flush()
      }
    }
  }
}

if (require.main === module) {
  const t0 = Date.now()
  const logTime = (...args) => {
    const t = Date.now()
    console.log(`[t=${t - t0}]`, ...args)
  }

  const limiter = new RateLimit({
    limit: 3,
    period: 3000,
    concurrency: 5
  })

  const fn = (i) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        logTime(`Finished task ${i}`)
        resolve(i)
      }, 7000)
    })
  }

  limiter.enqueue(fn, [1])
  limiter.enqueue(fn, [2])
  limiter.enqueue(fn, [3])
  limiter.enqueue(fn, [4], 2)
  limiter.enqueue(fn, [5], 10)
  limiter.enqueue(fn, [6])
  limiter.enqueue(fn, [7])
  limiter.enqueue(fn, [8])
  limiter.enqueue(fn, [9])
  limiter.enqueue(fn, [10])
}
