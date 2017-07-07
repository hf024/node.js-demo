/**
 * Description:
 * Author: apple
 * Date: 2017/7/6.
 */
var http =  require('http');
var querystring = require('querystring');
var util = require('util');

var postHTML =
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';

http.createServer(function(req,res){
    //post变量，用于暂存请求体的信息
    var body = '';

    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data',function(chunk){
        body += chunk;
    });

    //在end事件触发后，通过querysting.parse将post解析为真正的post请求格式，然后向客户端返回
    req.on('end',function(){
        //解析参数
        body = querystring.parse(body);
        //res.write(util.inspect(querystring));
        //设置相应头部信息及编码
        res.writeHead(200,{'Content-Type':'text/html; charset = utf8'});

        if(body.name && body.url){ //输出提交的数据
            res.write('网站名：' + body.name + '<br/>');
            res.write('网站URL：' + body.url + '<br/>');
        }else{
            res.write(postHTML);
        }

        //res.write(util.inspect(querystring));
        console.log(querystring);
        res.end();
    });
}).listen(8001);