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
    'type': 'MEMORY LOAD'
  };
  return function (callback) {
    requestRunner.run(opts, callback);
  };
}

exports.start = function (cb) {

  var funcs = [];

  funcs.push(getRunner('/run/memory?num=999', 1, null, null, 60));
  funcs.push(getRunner('/run/memory?num=9999', 1, null, null, 120));
  funcs.push(getRunner('/run/memory?num=59999', 1, null, null, 450));
  // funcs.push(getRunner('/run/memory?num=149999', 1, null, null, 180));
  // funcs.push(getRunner('/run/memory?num=399999', 1, null, null, 180));

  console.log('\n');
  console.log('******************************************************************************');
  console.log('******************************************************************************');
  console.log('******************************************************************************');
  console.log('\n');
  console.log('Starting Memory Load now');
  console.time('all-memory');

  async.series(funcs, function () {
    console.log('Finised Memory load run');
    console.timeEnd('all-memory');
    console.log('\n');
    console.log('******************************************************************************');
    console.log('******************************************************************************');
    console.log('******************************************************************************');
    cb();
  });
};
