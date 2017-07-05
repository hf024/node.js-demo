/**
 * Description:
 *     node.js的事件机制采用的是设计模式中的观察者模式
 *     事件为主题，所有注册到该事件的处理函数为观察者
 * Author: apple
 * Date: 2017/7/4.
 */

//引入events模块
var event = require('events');

//创建eventEmitter对象，实例化eventEmitter类来绑定和监听事件
var eventEmitter = new event.EventEmitter();

/*
//绑定事件处理程序
eventEmitter.on('eventName', eventHandler);

//触发事件
eventEmitter.emit('eventName');
*/

//创建connection事件处理程序
var connectHandler = function connected(){
    console.log('连接成功！');

    //触发data_received事件
    eventEmitter.emit('data_received');
};

//绑定connection事件处理程序
eventEmitter.on('connection', connectHandler);

//使用匿名函数绑定data_received事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功');
});

//触发connection事件
eventEmitter.emit('connection');

console.log('程序执行完毕！');
