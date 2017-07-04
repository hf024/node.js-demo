/**
 * Description: 阻塞代码实例
 * Author: apple
 * Date: 2017/7/4.
 */

var fs = require('fs');

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log('进程结束');
