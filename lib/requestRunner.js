var config = require('./config');
var autocannon = require('autocannon');
// var timestring = require('timestring');

function run(opts, cb) {

  // duration, requestsPerSecond, connections, pipelining, timeout

  // var str = '20s';
  // var time = timestring(str);

  console.log('******************************************************************************');

  console.log('Starting %s with autocannon with %s', opts.type, JSON.stringify(opts));
  console.time(opts.type);

  var duration = opts.duration || 50;
  var amount = opts.requestsPerSecond * (duration / opts.requestsPerSecond);

  console.log('amount is ' + amount);
  console.log('duration is ' + duration);

  autocannon({
    url: config.host + ':' + config.port + opts.path,
    connections: 1,
    amount: amount,
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

    console.log('time to run:: ');
    console.timeEnd(opts.type);
    console.log('\n');
    console.log('finished autocannon with %s', JSON.stringify(res));
    console.log('******************************************************************************');
    // console.log(JSON.stringify(res));
    console.log('\n');
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
