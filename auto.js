// 自动重启

let process = require('child_process');
let fs = require('fs');
let ChildProcess = process.fork('./app.js');

ChildProcess.on('exit', function (code) {
  console.log('process exits + ' + code);
  fs.appendFileSync('./log.txt', code);
  if (code !== 0) {
    process.fork('./auto.js');
  }
});