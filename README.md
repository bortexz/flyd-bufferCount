# flyd-debounceTime
[![Build Status](https://travis-ci.org/bertofer/flyd-bufferCount.svg?branch=master)](https://travis-ci.org/bertofer/flyd-bufferCount)

bufferCount implementation for flyd streams.

Buffers the source stream, and emits when the buffer is size bufferSize, and starts a new buffer each bufferEvery.

`(Number [Number] Stream) -> Stream Buffer`

```
a:                    {1-2-3------4----5---6-----7---}
bufferCount(3, 2, a): {----.-----------.---------.---}
                           [1,2,3]     [3,4,5]   [5,6,7]
```
## Usage
```javascript
var stream$ = flyd.strem()
var buffer32$ = bufferCount(3, 2, stream$)
stream$(1)
assert.deepEqual(buffer32$(), undefined)
stream$(2)(3)
assert.deepEqual(buffer32$(), [1, 2, 3])
stream$(4)(5)
assert.deepEqual(buffer32$(), [3, 4, 5])
```