/**
 * Description:
 * Author: apple
 * Date: 2017/7/6.
 */
var express = require('express');
var app = express();
var fs = require('fs');

/*
 HTTP 方法
 以下为 REST 基本架构的四个方法：
 GET - 用于获取数据。
 PUT - 用于更新或添加数据。
 DELETE - 用于删除数据。
 POST - 用于添加数据。
 */
//显示所有用户信息
app.get('/listUsers', function(req,res){
   fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err,data){
      console.log(data);
      res.end(data);
   });
});

var user = {
    "user5": {
        "name" : 'Macro',
        "passwrod": "OPRJkdgAG",
        "id" : 5
    }
};

//添加新用户
app.get('/addUser', function(req,res){
   //读取已经存在的数据
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err,data){
        data  = JSON.parse(data);
        data["user5"] = user["user5"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

//删除用户
var id = 2;
app.get('/delUser', function(req,res){
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err,data){
        data = JSON.parse(data);
        delete data["user2"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

//显示用户详细信息
app.get('/:id', function(req,res){
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', function(err,data){
        data = JSON.parse(data);
        var id = req.params.id;
        var user = data["user"+id];
        console.log(user);
        res.end(JSON.stringify(user));
    })
});



var server = app.listen(8001,function(){
   var host = server.address().address;
   var port = server.address().port;
   console.log("应用实例，访问地址为 http://%s:%s", host, port)
});