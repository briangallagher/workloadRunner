var cpuLoad = require('./cpuLoad');
var memoryLoad = require('./memoryLoad');
var ioLoad = require('./ioLoad');

function startCPU(cb) {
  cpuLoad.start(cb);
}

function startMemory(cb) {
  memoryLoad.start(cb);
}

function startIO(cb) {
  ioLoad.start(cb);
}

exports.start = function (cb) {
  startCPU(function () {
    startMemory(function () {
      startIO(cb);
    });
  });
};
