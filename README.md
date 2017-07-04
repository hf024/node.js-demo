# node.js-demo
记录node.js学习历程、心得体会、收获

## node.js的安装
node.js支持windows、linux、mac平台，node.js的安装有两种方式： 
1）直接从官网下载安装，下载地址：http://nodejs.cn/download/  
2）通过nvm安装 (*nvm install node_version*)

*注意：Linux上安装Node.js需要安装Python 2.6 或 2.7，不建议安装Python 3.0以上版本。*

## node.js组成
node.js由以下三部分组成：  
1）引入 require 模块
使用 require 指令来载入 Node.js 模块

2）创建服务器
服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。

3）接收请求与响应请求 
服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据

## REPL(交互式解释器)
Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。
Node 自带了交互式解释器，可以执行以下任务：
* 读取 - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
* 执行 - 执行输入的数据结构
* 打印 - 输出结果
* 循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。
Node 的交互式解释器可以很好的调试 Javascript 代码。

## 回调函数
异步编程的直接体现，回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

## 事件循环
* Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。
* Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。
* Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
* Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

事件驱动程序
Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。
当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。
<img src="http://www.runoob.com/wp-content/uploads/2015/09/event_loop.jpg">
这个模型非常高效可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）
在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(Subject)，而所有注册到这个事件上的处理函数相当于观察者(Observer)。
Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

## 参考资料

* [node英文网](https://nodejs.org/)
* [node中文网](http://nodejs.cn/) 
* [node.js中文教程](http://www.runoob.com/nodejs/nodejs-tutorial.html/)
