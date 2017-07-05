/**
 * Description:
 * Author: apple
 * Date: 2017/7/5.
 */
/*
 为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
 模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。
 换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。
*/
//以 exports.world 方式公开的模块接口
var hello1 = require('./hello');
hello1.world('Rita');

//以module.exports 方式公开的模块接口
var Hello = require('./hello_module');
var hello2 = new Hello();
hello2.setName('Bruce');
hello2.sayHello();