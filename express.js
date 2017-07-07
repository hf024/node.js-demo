/**
 * Description:
 * Author: apple
 * Date: 2017/7/6.
 */
var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var multer =  require('multer');
var cookieParser =  require('cookie-parser');

//设置静态文件路径
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest:'/tmp/'}).array('image'));
app.use(cookieParser());

//req对象：表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性
//res对象：表示HTTP响应，表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据
app.get('/', function(req, res){
    console.log('主页get请求, Cookies:', req.cookies);
    res.send('Hello Get（express）'); //主页输出"Hello Get(express)"
});

//主页 post请求
app.post('/', function(req, res){
   console.log("主页post请求");
   res.send('Hello Post');
});

app.get('/index.html', function(req,res){
   res.sendFile(__dirname + '/' + 'index.html');
});


app.get('/input.html', function(req,res){
    res.sendFile(__dirname + '/' + 'input.html');
});

app.get('/upload.html', function(req,res){
   res.sendFile(__dirname + '/' + 'upload.html');
});

app.get('/process_get', function(req, res){
   //输出JSON格式
    var response = {
        'first_name' : req.query.first_name,
        'last_name': req.query.last_name
    };

    console.log(response);
    res.end(JSON.stringify(response));
});

app.post('/file_upload', function(req, res){
    console.log(req.files[0]); //输出上传的文件信息

    var des_file = __dirname + '/' + req.files[0].originalname;
    fs.readFile(req.files[0].path,  function(err, data){
       fs.writeFile(des_file, data, function(err){
           if(err){
               console.log(err);
           }else{
               response = {
                   message: 'File uploaded successfully',
                   filename: req.files[0].originalname
               };
               console.log(response);
               res.end(JSON.stringify(response));
           }
       }) ;
    });
});

//list_user页面GET请求
app.get('/list_user', function(req,res){
    console.log('/list_user Get请求');
    res.send('用户列表页面');
});

app.get('/skin*', function(req, res){
    console.log('/skin* Get 请求');
    res.send('正则匹配页面响应Get请求');
});

var server = app.listen(8001, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});