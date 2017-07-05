/**
 * Description:
 * Author: apple
 * Date: 2017/7/5.
 */

/**
 * 把对象封装到模块中
 * @constructor
 */
function Hello(){
    var name;
    this.setName = function(thyName){
        name = thyName;
    };

    this.sayHello = function () {
        console.log('Hello,' + name + '!');
    }
}

module.exports = Hello;
