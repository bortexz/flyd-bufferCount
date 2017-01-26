var flyd = require('flyd')

module.exports = function(bufferSize, bufferEvery, source) {
  if (flyd.isStream(bufferEvery)) {
    source = bufferEvery
    bufferEvery = bufferSize
  }
  var buffer = []
  return flyd.combine(function(source, self) {
    buffer.push(source())
    if (buffer.length === bufferSize) {
      self(buffer)
      buffer = bufferEvery ? buffer.slice(bufferEvery) : buffer = []
    }
  }, [source])
}
