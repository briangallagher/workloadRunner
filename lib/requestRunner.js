var config = require('./config');
var autocannon = require('autocannon');
// var timestring = require('timestring');

function run(opts, cb) {

  // duration, requestsPerSecond, connections, pipelining, timeout

  // var str = '20s';
  // var time = timestring(str);

  console.log('starting autocannon with %s', JSON.stringify(opts));
  console.time('autocannon');

  var duration = opts.duration || 100;
  var amount = opts.requestsPerSecond * (duration / opts.requestsPerSecond);

  autocannon({
    url: config.host + ':' + config.port + opts.path,
    connections: 1,
    amount: opts.requestsPerSecond * (duration / opts.requestsPerSecond),
    pipelining: 1,
    timeout: opts.timeout || 10,
    maxConnectionRequests: 1,
    connectionRate: 1,
    reconnectRate: 1 // key field
      // connectionRate: opts.requestsPerSecond || 1,
  }, function (err, res) {
    if (err) {
      console.error('Error running: ');
      console.error(err);
    }
    console.log('finished autocannon with %s', JSON.stringify(opts));
    console.timeEnd('autocannon');
    console.log(JSON.stringify(res));
    console.log('\n');
    cb();
  });
}

exports.run = run;

// 100 max process

// 1 sec
// 20 * 20 => 20
// 60 * 20 =>
// 100 * 20
