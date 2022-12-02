// 自动重启

let process = require('child_process');
let fs = require('fs');
let ChildProcess = process.fork('./app.js');
let time = 0
ChildProcess.on('exit', function (code) {
  console.log('process exits + ' + code);
  fs.appendFileSync('./log.txt', code + "\n");
  if (time > 3) {
    return
  } else {
    if (code !== 0) {
      process.fork('./auto.js');
      time++
    }
  }
});