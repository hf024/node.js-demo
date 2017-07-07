/**
 * Description:
 * Author: apple
 * Date: 2017/7/5.
 */

// __filename 当前正在执行的脚本文件名
// 它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。
// 如果在模块中，返回的值是模块文件的路径。
console.log(__filename);

//__dirname 表示当前执行脚本所在的目录。
console.log(__dirname)

//setTimeout(cb, ms) 全局函数
// 在指定的毫秒(ms)数后执行指定函数(cb)。
// setTimeout() 只执行一次指定函数。
//返回一个代表定时器的句柄值。

var t = setTimeout(function(){
    console.log('It\'s a function using setTimeout()');
}, 1000);

// clearTimeout( t ) 全局函数
// 用于停止一个之前通过 setTimeout() 创建的定时器。
// 参数 t 是通过 setTimeout() 函数创建的定时器。

clearTimeout(t);

/*
 setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
 返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
 setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
 */

t = setInterval(function(){
    console.log('It\'s a function using setInterval()');
},2000);

clearInterval(t);

//console 用于提供控制台标准输出，它是由 Internet Explorer 的 JScript 引擎提供的调试工具，后来逐渐成为浏览器的事实标准。
//Node.js 沿用了这个标准，提供与习惯行为一致的 console 对象，用于向标准输出流（stdout）或标准错误流（stderr）输出字符。
console.log('Hello world'); //向标准输出流输出信息
console.log('byvoid%diovyb');
console.log('byvoid%diovyb', 1991);

console.error(); //向标准错误流输出
console.trace(); //向标准错误输出当前的调用栈

console.info('程序开始执行：');
var counter = 10;
console.log('计数：%d', counter);
console.time('获取数据');
for(var i = 0; i < counter; i++){
    console.log(i);
}
console.timeEnd('获取数据');
console.info('程序结束执行');

//process 是一个全局变量，即 global 对象的属性。
//它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
// 通常在你写本地命令行程序的时候，少不了要 和它打交道。
// 下面将会介绍 process 对象的一些最常用的成员方法。

process.on('exit',function(code){
   setTimeout(function () {
       console.log('该代码不会被执行');
   }, 0);

   console.log('退出码：',code);
});
console.log('程序执行结束');

//输出到终端
process.stdout.write('process stdout output \n');

//通过参数读取
process.argv.forEach(function(val, index, array){
    console.log(index + ':' + val);
});

//获取执行路径
console.log(process.execPath);

//输出当前目录
console.log('当前目录：' + process.cwd());

//输出当前版本
console.log('当前版本：' + process.version);

//输出内存使用情况
console.log(process.memoryUsage());

//输出 Node 已经运行的秒数。
console.log('Node 已经运行的秒数：'+ process.uptime());

