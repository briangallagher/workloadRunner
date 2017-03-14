var autocannon = require('autocannon');
var async = require('async');
var requestRunner = require('./requestRunner');

function getRunner(path, requestsPerSecond, connections, pipelining, duration, timeout, numRequests) {

  var opts = {
    'path': path,
    'duration': duration,
    'requestsPerSecond': requestsPerSecond,
    'connections': connections,
    'pipelining': pipelining,
    'timeout': timeout,
    'numRequests': numRequests,
    'type': 'IO LOAD'
  };
  return function (callback) {
    requestRunner.run(opts, callback);
  };
}

exports.start = function (cb) {

  var funcs = [];

  // funcs.push(getRunner('/run/io?seconds=1000', 1, null, null, 30));
  // funcs.push(getRunner('/run/io?seconds=2000', 1, null, null, 45));
  // funcs.push(getRunner('/run/io?seconds=3000', 1, null, null, 45));
  // funcs.push(getRunner('/run/io?seconds=5000', 1, null, null, 180));

  // reset
  funcs.push(getRunner('/run/io?seconds=1', 1, null, null, 10));

  console.log('\n');
  console.log('******************************************************************************');
  console.log('******************************************************************************');
  console.log('******************************************************************************');
  console.log('\n');
  console.log('Starting IO Load now');
  console.time('all-io');

  async.series(funcs, function () {
    console.log('Finised IO load run');
    console.timeEnd('all-io');
    console.log('\n');
    console.log('******************************************************************************');
    console.log('******************************************************************************');
    console.log('******************************************************************************');
    cb();
  });
};
