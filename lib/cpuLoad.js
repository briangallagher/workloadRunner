var autocannon = require('autocannon');
var async = require('async');
var requestRunner = require('./requestRunner');

function getUrlPathAndQuery() {
  // return '/run/cpu?seconds=0.01';
  return '/run/cpu?seconds=0.10';
}

function getUrlPathAndQuery2() {
  // return '/run/cpu?seconds=0.01';
  return '/run/cpu?seconds=0.50';
}

function getRunner(path, requestsPerSecond, connections, pipelining, duration, timeout, numRequests) {

  var opts = {
    'path': path,
    'duration': duration,
    'requestsPerSecond': requestsPerSecond,
    'connections': connections,
    'pipelining': pipelining,
    'timeout': timeout,
    'numRequests': numRequests,
  };
  return function (callback) {
    console.log('here !!!');
    requestRunner.run(opts, callback);
  };
}

exports.start = function (cb) {

  // vary r - which is requests per second
  // also, possibly vary c and p

  // Need to add in a timeout also !!
  // and monitor dropped connections
  // review the datadog blog again

  // autocannon -M 1 -r 1 -p 1 -c 1 -a 100 http://192.168.99.100:31443/run/cpu?seconds=0.1
  // autocannon -M 1 -r 2 -p 1 -c 1 -a 100 http://192.168.99.100:31443/run/cpu?seconds=0.1
  // autocannon -M 1 -r 3 -p 1 -c 1 -a 100 http://192.168.99.100:31443/run/cpu?seconds=0.1
  // autocannon -M 1 -r 5 -p 1 -c 1 -a 100 http://192.168.99.100:31443/run/cpu?seconds=0.1
  // autocannon -M 1 -r 7 -p 1 -c 1 -a 100 http://192.168.99.100:31443/run/cpu?seconds=0.1

  var funcs = [];

  // Notes:
  // How long does it take for it to pick up rise and scale:
  // ans: 1 min 40 to scale up to 2
  // The problem is the delay in Kubernetes spinning up and down

  // TODO: look into increasing the refresh rate in heapster

  // funcs.push(getRunner('/run/cpu?seconds=0.7', 1)); // takes 25 seconds to rise above 50%
  // funcs.push(getRunner('/run/cpu?seconds=1.8', 1));
  // funcs.push(getRunner('/run/cpu?seconds=2.8', 1));
  // funcs.push(getRunner('/run/cpu?seconds=3', 2));
  // funcs.push(getRunner('/run/cpu?seconds=5', 3));
  // funcs.push(getRunner('/run/cpu?seconds=8', 3)); // This got it up to 10
  // funcs.push(getRunner('/run/cpu?seconds=10', 3)); // This got it up to 10

  funcs.push(getRunner('/run/cpu?seconds=0.7', 1)); // takes 25 seconds to rise above 50%
  funcs.push(getRunner('/run/cpu?seconds=1.8', 1));
  funcs.push(getRunner('/run/cpu?seconds=2.8', 1));
  funcs.push(getRunner('/run/cpu?seconds=3', 2));
  funcs.push(getRunner('/run/cpu?seconds=3', 3));
  funcs.push(getRunner('/run/cpu?seconds=3', 6));
  funcs.push(getRunner('/run/cpu?seconds=3', 8));
  funcs.push(getRunner('/run/cpu?seconds=3', 9));

  // funcs.push(getRunner('/run/cpu?seconds=15', 5));
  // funcs.push(getRunner('/run/cpu?seconds=25', 5));
  // funcs.push(getRunner('/run/cpu?seconds=7', 3)); // At this rate it seemed like packets were being dropped - but maybe we want that !!

  // Slowly increase the number of requests and the cpu seconds !!
  async.series(funcs, function () {
    console.log('Finised CPU load run');
    cb();
  });
};

//
