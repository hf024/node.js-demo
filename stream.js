/**
 * Description:
 * Author: apple
 * Date: 2017/7/5.
 */

var fs = require('fs');
var rdata = '';

//创建可读流
var rdStream = fs.createReadStream('input.txt');

//设置编码为utf8
rdStream.setEncoding('UTF8');

//处理流事件 --> data, end, and error
rdStream.on('data',function(chunk){
    rdata += chunk;
});

rdStream.on('error',function (err) {
    console.log(err.stack);
});

rdStream.on('end',function () {
    console.log('read data:' + rdata);
});

console.log('program: read stream end');

var wrdata = 'write stream into output.txt';

var wrtStream = fs.createWriteStream('output.txt');

//使用utf8编码写入数据
wrtStream.write(wrdata,'UTF8');

//标记文件末尾
wrtStream.end();

//处理流事件 --> finish 和 erro
wrtStream.on('finish',function () {
    console.log('write finished');
});

wrtStream.on('error',function(){
    console.log(err.stack);
});

console.log('write stream program end');

//管道流
//管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
var wrt2Stream = fs.createWriteStream('pipe_out.txt');
rdStream.pipe(wrt2Stream);
console.log('pipe stream program end');

//链式流
//链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
//接下来我们就是用管道和链式来压缩和解压文件。
var zlib = require('zlib');

//压缩input.txt文件为input.gz
var wCompressStream = fs.createWriteStream('input.txt.gz');
wCompressStream.on('finish',function(){
    console.log('file compress end');

    fs.createReadStream('input.txt.gz')
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream('input_decompress.txt'));

    console.log('file decompress end');
});
rdStream.pipe(zlib.createGzip()).pipe(wCompressStream);


//解压input.gz 为input_decompress.txt;

