/**
 * Created by apple on 2017/7/4.
 */
//step1 引入required模块
// 使用 require 指令来载入 node.js自带的 http 模块，并将实例化的 HTTP 赋值给变量 http，实例如下:
var http = require('http');

//step2 创建服务器
//使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。
// 函数通过 request, response 参数来接收和响应数据。
var server = http.createServer(function(request, response){

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World. Rita\'s first program  for node.js\n');
}).listen(8001);

//服务器运行调试信息
console.log('Server running at http://127.0.0.1:8001/');

/**
 以上代码完成了一个可以工作的 HTTP 服务器
 使用该服务器的方法：
 1.开启服务进程
 使用 node 命令执行以上的代码：
 node server.js

 屏幕会输出如下内容：
 Server running at http://127.0.0.1:8888/

 2.客户端（浏览器）发送请求，服务器返回数据
 接下来，打开浏览器访问 http://127.0.0.1:8888/，你会看到一个写着 "Hello World. Rita's ......"的网页。
 */

