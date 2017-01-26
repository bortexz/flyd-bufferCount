var flyd = require('flyd')
var bufferCount = require('../')
var assert = require('assert')

describe('bufferCount', function () {
  var stream$;

  beforeEach(function() {
    stream$ = flyd.stream()
  })

  it('Should buffer the specified number of events', function () {
    var buffer2$ = bufferCount(2, stream$)
    stream$(1)
    assert.deepEqual(buffer2$(), undefined)
    stream$(2)
    assert.deepEqual(buffer2$(), [1, 2])
  })

  it('Should wait until next buffer is complete to push new values', function() {
    var buffer2$ = bufferCount(2, stream$)
    stream$(1)
    assert.deepEqual(buffer2$(), undefined)
    stream$(2)
    assert.deepEqual(buffer2$(), [1, 2])
    stream$(3)
    assert.deepEqual(buffer2$(), [1, 2])
    stream$(4)
    assert.deepEqual(buffer2$(), [3, 4])
  })

  it('Should start to buffer every specified number of events', function () {
    var buffer32$ = bufferCount(3, 2, stream$)
    stream$(1)
    assert.deepEqual(buffer32$(), undefined)
    stream$(2)(3)
    assert.deepEqual(buffer32$(), [1, 2, 3])
    stream$(4)(5)
    assert.deepEqual(buffer32$(), [3, 4, 5])
  })
})
