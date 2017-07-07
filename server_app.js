/**
 * Description:
 * Author: apple
 * Date: 2017/7/5.
 */

var server = require('./server');
var router = require('./route');

server.start(router.route);