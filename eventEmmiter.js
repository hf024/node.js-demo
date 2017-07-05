/**
 * Description:
 * Author: apple
 * Date: 2017/7/4.
 */

var events = require('events');
var eventEmitter = new events.EventEmitter();

//定义监听器
// 监听器1
var listener1 = function() {
   console.log('listener 1 is running');
};

//监听器2
var listener2 = function(){
   console.log('listener 2 is running');
};

//给事件绑定监听器
eventEmitter.addListener('connection',listener1);

//on 和 addListener是一样的定义，两者没有区别
eventEmitter.on('connection',listener2);

//var eventListeners = eventEmitter.listenerCount('connection');
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');

console.log(eventListeners + " listeners is connecting to this event");

//处理connection事件
eventEmitter.emit('connection');

//移除绑定的listener1函数
eventEmitter.removeListener('connection',listener1);
console.log('listener1 is removed');

//触发连接事件
eventEmitter.emit('connection');
//eventListeners = eventEmitter.listenerCount('connection');
//or
eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " listeners is connecting to this event");
console.log('program is end');




