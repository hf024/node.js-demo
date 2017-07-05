/**
 * Description: Buffer类（缓存区）
 * Author: apple
 * Date: 2017/7/5.
 */

//Buffer 类的创建
//方法1 数字
var buf1 = new Buffer(10);
len1 = buf1.write('write buf1 content');

//从缓冲区读取数据
//返回值：解码缓冲区数据并使用指定的编码返回字符
console.log('buf1:' + buf1.toString());

//方法2 数组
var buf2 = new Buffer([10,20,30,40,50]);
len2 = buf2.write('write buf2 content');
console.log('buf2:' + buf2.toString());

//方法3 字符串 默认编码：utf-8，还支持：'ascii','utf16le',ucs2','base64'和'hex'
var buf3 = new Buffer('www.birdfly.com', 'utf-8');
console.log('buf3:' + buf3.toString());

var buf4 = new Buffer(256);

//写入缓冲区
// 返回实际写入的大小，如果buffer空间不足，则只会写入部分字符串
len = buf4.write('write buf for test');
console.log('buf:' + buf4.toString() + ',write buf len:' +  len);

var buf = new Buffer(256);

for(var i = 0; i < 26; i++){
    buf[i] = i + 97;
}


//从缓冲区读取数据
//返回值：解码缓冲区数据并使用指定的编码返回字符
console.log(buf.toString('ascii'));
console.log(buf.toString('ascii', 0, 5));
console.log(buf.toString('utf8', 0, 5));
console.log(buf.toString(undefined, 0, 5));

buf = new Buffer('www.runoob.com');
//将Buffer转化为JSON对象
var json = buf.toJSON();
console.log(json);

//缓冲区合并
buf = Buffer.concat([buf1,buf2]);
console.log('buf1 content:' +  buf1. toString());
console.log('buf2 content:' +  buf2. toString());
console.log('buf1 merge buf2 content:' +  buf. toString());

//缓冲区比较
var res = buf1.compare(buf2);
console.log('buf1 compare with buf2, res(1:before, 2:same, 3:after):' +  res);

console.log('buf3:'+buf3.toString());
buf.copy(buf3);
console.log('after buf copy buf3, buf content:' + buf3.toString());

//缓冲区裁剪
var buf5 = buf.slice(0, 5);
console.log('buf:' + buf5.toString() + 'len:' + buf5.length);
