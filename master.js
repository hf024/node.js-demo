/**
 * Description:
 * Author: apple
 * Date: 2017/7/6.
 */

const fs = require('fs');
const child_process = require('child_process');

for(var i = 0; i < 3; i++){
    var workerProcess = child_process.exec('node support.js exec'+ i, function (err, stdout, stderr) {
        if(err){
            console.log(err.stack);
            console.log('Error code:' + err.code);
            console.log('Signal received:' + err.signal);
        }

        console.log('stdout:' + stdout);
        console.log('stderr:' + stderr);
    });

    workerProcess.on('exit', function(code){
       console.log('exec创建的子进程已经退出，退出码' + code);
    });
}

for(var i = 0; i < 3; i++){
    var workerProcess = child_process.spawn('node',['support.js', 'spawm ' + i]);
    workerProcess.stdout.on('data' , function (data) {
        console.log('stdout:' + data);
    });

    workerProcess.stderr.on('data', function(data){
        console.log('stderr:' + data);
    });

    workerProcess.on('close', function(code){
        console.log('spawm创建的子进程已经退出，退出码' + code);
    });
}

for(var i=0; i<3; i++) {
    var worker_process = child_process.fork("support.js", ['fork ' + i]);

    worker_process.on('close', function (code) {
        console.log('子进程已退出，退出码 ' + code);
    });
}
