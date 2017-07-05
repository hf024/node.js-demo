/**
 * Description: 非阻塞代码实例
 * Author: apple
 * Date: 2017/7/4.
 */

var fs = require('fs');

//因此，阻塞是按顺序执行的，而非阻塞是不需要按顺序的，
// 所以如果需要处理回调函数的参数，就需要写在回调函数内。
//以下是执行异步操作的函数
var data = fs.readFile('input.txt',function(err,data){
    if(err){
        return console.error(err);
    }
    console.log(data.toString());
});

console.log('进程结束');
