/**
 * Description:
 * Author: apple
 * Date: 2017/7/6.
 */

var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
   res.writeHead(200, {'Content-Type': 'text/plain; charset = utf-8'});
   res.write('req.url:' + req.url+'\n');
   //res.write(util.inspect(req));
   var params = url.parse(req.url,true).query;
   res.write(util.inspect(params)+'\n');
   res.end(util.inspect(url.parse(req.url, true)));
}).listen(8001);