
var mongoose = require('mongoose');
// mongoose.connect('mongodb://zengqinglong:wa1107238436@106.54.58.206:27017/liangwei', { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/liangwei', { useUnifiedTopology: true, useNewUrlParser: true });
console.log("准备链接到数据库服务器")
/**
  * 连接成功
  */
mongoose.connection.on('connected',async function () {
  console.log("成功链接到服务器")
  var userModel = require('../models/backuser');
  var data = await userModel.find({name:'admin'}).exec();
  if (data.length == 0) {
    await userModel.create({
      name:'admin',
      password:'admin312123',
      realname:"管理员",
      identity:"admin",
      shop:"all"
    })
    console.log("成功初始化管理员信息")
  }
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected');
});


module.exports = mongoose;