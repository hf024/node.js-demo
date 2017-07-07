/**
 * Created by apple on 2017/7/4.
 */
//step1 引入required模块
// 使用 require 指令来载入 node.js自带的 http 模块，并将实例化的 HTTP 赋值给变量 http，实例如下:
var http = require('http');
var url =  require('url');
var fs = require('fs');


function start(route){
    function onRequest(request, response) {
        //解析请求包，包括文件名
        var pathname = url.parse(request.url).pathname;
        //输出请求的文件名
        console.log('Request for ' + pathname + ' received!');

        route(pathname);

        var filename = pathname.lengt > 2 ? pathname.substr(1):'index.html';

        //从文件系统中读取客户端所有请求的文件内容（如：html页面）
        fs.readFile(filename, function (err, data) {
            if (err) {
                console.error(err);
                //HTTP状态码 404 : NOT FOUND
                //Content Type: text/plain
                response.writeHead(404, {'Content-Type': 'text/html'});
            } else {
                //HTTP状态吗 200： OK
                //Content Type: text/plain
                response.writeHead(200, {'Content-Type': 'text/html'});

                //响应文件内容
                response.write(data.toString());
            }

            //发送响应数据
            response.end();
        });
    }

    //创建服务器
    http.createServer(onRequest).listen(8001);
    console.log('Server running at http://127.0.0.1:8001/');
}

exports.start = start;

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

