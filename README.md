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

## EventEmitter 类
Node.js 所有的异步I/O操作在完成时都会发送一个事件到事件队列
Node.js 里面的许多对象都会分发事件，所有这些产生事件的对象都是events.EventEmiter的实例

events 模块只提供了一个对象： events.EventEmitter

EventEmitter 的核心就是事件触发与事件监听器功能的封装，比如：
* EventEmitter 对象如果在实例化时发生错误，会触发error事件
* 当添加新的监听器时，newListener事件会触发
* 当监听器被移除时，removeListener事件被触发

Emitter提供了很多属性
1 方法
* on(event,listener)&nbsp;绑定事件函数，为指定事件注册一个监听器，接收一个字符串event(事件名)和一个回调函数
* emit(event)&nbsp;触发事件
* addListener(event,listener)&nbsp;为指定事件添加一个监听器到监听器数组的尾部
* once(event,listener)&nbsp;为指定事件注册一个单词监听器，即监听器最多只会触发一次，触发后立即解除该监听器(如:connection)
* removeListener(event,listener)&nbsp;移除指定事件的某个监听器（该监听器必须是已经注册过的）
* removeAllListeners(\[evert\])&nbsp;移除所有事件的所有监听器，如果指定了事件event，则移除指定事件的所有监听器
* setMaxListeners(n)&nbsp;默认，EventEmitters支持10个监听器（多了，会给出警告信息），通过该函数可提高默认的监听器数量限制
* listener(event)&nbsp;返回指定事件的监听器数组
* emit（event,\[arg1\],\[arg2\],\[...\])&nbsp;按参数的顺序执行每个监听器，如果事件有注册监听返回true，否则返回false
注意：on 和 addListener 方法其实是一样的 [点击查看](https://github.com/nodejs/node/blob/v1.x/lib/events.js#L244)

2 类方法  
* listenerCount(emitter, event)&bnsp;返回指定事件的监听器数量

3 事件
* newListener&nbsp;该事件在添加新监听器时被触发
* removeListener&nbsp;从指定监听器数组中删除一个监听器，会改变被删除监听器之后的那些监听器的索引  

error 事件
EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，我们在遇到 异常的时候通常会触发 error 事件。
当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
我们一般要为会触发 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃

继承 EventEmitter
大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。
为什么要这样做呢？原因有两点：
首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发射应该是一个对象的方法。
其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

EeventEmitter方法的定义，[在此查看](https://github.com/nodejs/node/blob/v1.x/lib/events.js)

## Buffer类
在处理TCP流、文件流时，必须使用到二进制数据，而javascript本身没有二进制数据类型，因此，在Node.js中，
定义了一个Buffer类，该类用来创建一个专门存放二进制数据的缓存区

在Node.js中，Buffer类时随Node内核一起发布的核心库。Buffer库为Node.js带来了一种存储原始数据的方法，可以让Node.js处理二进制数据。
每当Node.js需要处理I/O操作中移动的数据时，就有可能使用Buffer库。
原始数据存储在Buffer类的实例中，一个Buffer类似一个整数数组，但它对应V8堆内存之外的一块原始内存

## Stream (流)
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
Node.js，Stream 有四种流类型：
* Readable - 可读操作。
* Writable - 可写操作。
* Duplex - 可读可写操作.
* Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
* data - 当有数据可读时触发。
* end - 没有更多的数据可读时触发。
* error - 在接收和写入过程中发生错误时触发。
* finish - 所有数据已被写入到底层系统时触发。

## 模块系统
为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。
换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

Node.js 提供了exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

## 全局对象
JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。

全局对象与全局变量
global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条 件的变量是全局变量：
* 在最外层定义的变量；
* 全局对象的属性；
* 隐式定义的变量（未定义直接赋值的变量）。
当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。需要注 意的是，在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文。

*注意： 永远使用 var 定义变量以避免引入全局变量，因为全局变量会污染 命名空间，提高代码的耦合风险。*


## 常用工具 util  
   util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。
   * util.inherits(constructor, superConstructor)  
     是一个实现对象间原型继承的函数。JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有 提供对象继承的语言级别特性，而是通过原型复制来实现的。
   * util.inspect  
   是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
   showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
   depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。 如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
   特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了toString 方法也不会调用。
   * util.isArray(object)  
     如果给定的参数 "object" 是一个数组返回true，否则返回false。
   * util.isRegExp(object)  
     如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
   * util.isDate(object)  
     如果给定的参数 "object" 是一个日期返回true，否则返回false。
   * util.isError(object)  
     如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
   [更多内容](https://nodejs.org/api/util.html)

## 文件系统
   Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 
### 异步和同步
   Node.js文件系统(fs模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
   异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
   建议大家是用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
   [更多内容](https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback)
### 文件系统的方法  
   * open 打开文件
   * stat 获取文件信息
   * writeFile 写入文件
   * readFile 读取文件
   
## GET/POST请求

## 工具模块  
   * OS    [基本的系统操作函数](http://www.runoob.com/nodejs/nodejs-os-module.html)
   * Path  [处理和转换文件路的工具](http://www.runoob.com/nodejs/nodejs-path-module.html)
   * Net   [用于底层的网络通信，提供服务端和客户端的操作](http://www.runoob.com/nodejs/nodejs-net-module.html)
   * DNS   [用于解析域名](http://www.runoob.com/nodejs/nodejs-dns-module.html)
   * Domain [简化异步代码的异常处理，可以捕捉处理try catch无法捕捉到的](http://www.runoob.com/nodejs/nodejs-domain-module.html)

## web模块
   * 服务器
   http.createServer(function (request, response)  {});
   
   * 客户端
   http.request(options, callback);

## Express 框架
   Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
   使用 Express 可以快速地搭建一个完整功能的网站。
   Express 框架核心特性：
   * 可以设置中间件来响应 HTTP 请求。
   * 定义了路由表用于执行不同的 HTTP 请求动作。
   * 可以通过向模板传递参数来动态渲染 HTML 页面。
### 安装 Express
   安装 Express 并将其保存到依赖列表中：
   $ cnpm install express --save
   以上命令会将 Express 框架安装在当前目录的 node_modules 目录中， node_modules 目录下会自动创建 express 目录。以下几个重要的模块是需要与 express 框架一起安装的：
body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。
   $ cnpm install body-parser --save
   $ cnpm install cookie-parser --save
   $ cnpm install multer --save
安装完后，我们可以查看下 express 使用的版本号：
   $ cnpm list express

   [expresss](http://expressjs.com/)
   [Express 4.x API 中文文档](https://www.runoob.com/w3cnote/express-4-x-api.html)
   [Express 4.x API](http://expressjs.com/zh-cn/4x/api.html)

## RESTful API
   REST  
   表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。
   表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful。需要注意的是，REST是设计风格而不是标准。REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。REST 通常使用 JSON 数据格式。

   HTTP 方法
   以下为 REST 基本架构的四个方法：
   * GET - 用于获取数据。
   * PUT - 用于更新或添加数据。
   * DELETE - 用于删除数据。
   * POST - 用于添加数据。
   
   [RESTful架构详解](http://www.runoob.com/w3cnote/restful-architecture.html)

## 多进程
   我们都知道 Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。
   每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。
   Node 提供了 child_process 模块来创建子进程，方法有：
   * exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
   * spawn - child_process.spawn 使用指定的命令行参数创建新进程。
   * fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。

## JXcore 打包
   Node.js 是一个开放源代码、跨平台的、用于服务器端和网络应用的运行环境。
   JXcore 是一个支持多线程的 Node.js 发行版本，基本不需要对你现有的代码做任何改动就可以直接线程安全地以多线程运行。
   [更多内容](http://jxcore.com/)
   
## MySQL
   [MySQL教程](http://www.runoob.com/mysql/mysql-tutorial.html)

## MongoDB
   MongoDB是一种文档导向数据库管理系统，由C++撰写而成。
   [关于MongDB](http://www.runoob.com/mongodb/mongodb-tutorial.html)

## 参考资料

* [node英文网](https://nodejs.org/)
* [node中文网](http://nodejs.cn/) 
* [node.js中文教程](http://www.runoob.com/nodejs/nodejs-tutorial.html/)
