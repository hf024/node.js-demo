/**
 * Description:
 * Author: apple
 * Date: 2017/7/7.
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

connection.connect();

connection.query('select 1 + 1 as solution', function(err, results, fields){
   if(err){
       throw err;
   }
   console.log('The solution is: ', results[0].solution);
});