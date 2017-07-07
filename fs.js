/**
 * Description:
 * Author: apple
 * Date: 2017/7/6.
 */

var fs = require('fs');

//异步读取，有一个设置回调函数的参数
fs.readFile('input.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log('异步读取到的数据：' + data.toString());
});

//同步读取
var data = fs.readFileSync('input.txt');
console.log('同步读取到的数据：' + data.toString());
console.log('程序执行完毕！');

//文件系统方法练习
//1.异步模式打开 fs.open(path, flags[, mode], callback)
/*
 参数使用说明如下：
 path - 文件的路径。
 flags - 文件打开的行为。具体值详见下文。
 mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
 callback - 回调函数，带有两个参数如：callback(err, fd)。
 */

console.log('准备打开文件！');
fs.open('input.txt', 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }

    console.log('文件打开成功！');
});

//2.获取文件信息
// 以下为通过异步模式获取文件信息的语法格式：
/*
 fs.stat(path, callback)
 参数
 参数使用说明如下：
 path - 文件路径。
 callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
 fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
 */
fs.stat('./server.js', function (err, stats) {
    if (err) {
        return console.error(err);
    }

    console.log(stats);
    console.log('读取文件信息成功！');

    console.log('是否是文件：' + stats.isFile());
    console.log('是否是目录：' + stats.isDirectory());
});

/*
 以下为异步模式下读取文件的语法格式：
 fs.read(fd, buffer, offset, length, position, callback)
 该方法使用了文件描述符来读取文件。
 参数
 参数使用说明如下：
 fd - 通过 fs.open() 方法返回的文件描述符。
 buffer - 数据写入的缓冲区。
 offset - 缓冲区写入的写入偏移量。
 length - 要从文件中读取的字节数。
 position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
 callback - 回调函数，有三个参数err, bytesRead, buffer;其中：err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
 */

//关闭文件
/*
 以下为异步模式下关闭文件的语法格式：
 fs.close(fd, callback)
 该方法使用了文件描述符来读取文件。
 参数
 参数使用说明如下：
 fd - 通过 fs.open() 方法返回的文件描述符。
 callback - 回调函数，没有参数。
 实例
 */

var buf = new Buffer(1024);
console.log('准备打开已经存在的文件');
fs.open('input.txt', 'r+', function (err, fd) {
    if (err) {
        return console.error(err);
    }

    console.log('文件打开成功！');
    console.log('准备读取文件：');
    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
        if (err) {
            return console.error(err);
        }

        console.log(bytes + '字节被读取');

        //仅输出读取的字节
        if (bytes > 0) {
            console.log('通过fs.read()读取的内容' + buf.slice(0, bytes).toString());
        }

        fs.close(fd, function () {
            if (err) {
                return console.error(err);
            }

            console.log('文件关闭成功！');
        });


        /*
         以下为删除文件的语法格式：
         fs.unlink(path, callback)
         参数
         参数使用说明如下：
         path - 文件路径。
         callback - 回调函数，没有参数。
         实
         */
        /*fs.unlink('input.txt', function(err) {
         if (err) {
         return console.error(err);
         }
         console.log("文件删除成功！");
         });*/
    });
});

var path = '/tmp/test';
//Node.js的fs模块只提供了删除文件unlink夹及目录rmdir的功能，所以一起删除需要我们遍历删除
//删除目录下的所有文件和子目录，异步实现代码：
/*
fs.exists(path, function (exists) {
    if(exists){
        console.log('find ' + path);
        fs.readdir(path, function (err, files) {
            if (err) {
                return console.error(err);
            }
            files.forEach(function (file) {
                console.log('exists readdir读取的文件：'+file);
                var curpath = path + '/' + file;
                fs.stat(curpath, function(err,stats){
                   if(err){
                       return console.error('stat error:' + err);
                   }

                   if(stats.isDirectory()){
                       fs.rmdir(curpath,function(err){
                           if(err){
                               return console.error('rmdir error:' + err);
                           }
                           console.log('rmdir path:' +  curpath);
                       });
                   }else if(stats.isFile()){
                       fs.unlink(curpath, function (err) {
                           if(err){
                               return console.error('unink error:' + err);
                           }

                           console.log('unlink error:' + path);
                       });
                   }
                });
            });
        });
    }else{
        console.log(path + 'is no exists');
    }
});
*/

//删除指定目录（包括子目录下的所有文件），同步实现代码
function deleteall(path) {
    var files = [];
    if(fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteall(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

//删除目录
console.log('准备删除目录');
deleteall(path);

console.log('创建目录');
fs.mkdir(path, function (err) {
    if (err) {
        return console.error(err);
    }

    console.log('目录创建成功！');
    //3.写入文件
    /*
     以下为异步模式下写入文件的语法格式：
     fs.writeFile(file, data[, options], callback)
     如果文件存在，该方法写入的内容会覆盖旧的文件内容。
     参数
     参数使用说明如下：
     file - 文件名或文件描述符。
     data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
     options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
     callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
     */
    console.log('准备写入文件');
    fs.writeFile(path+'/input.txt', '我是通过fs.writeFile写入的文件内容', function (err) {
        if (err) {
            return console.error(err);
        }

        console.log('数据写入成功！');
        console.log('------我是分割线-------');
        console.log('读取写入的数据！');

        fs.readFile(path+'/input.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log('异步读取文件数据：' + data.toString());

            fs.readdir(path, function (err, files) {
                if (err) {
                    return console.error(err);
                }
                files.forEach(function (file) {
                    console.log('readdir读取的文件：'+file);
                });
            });
        });



    });



});











