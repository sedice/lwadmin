const router = require('koa-router')();

const userModel = require("../../models/user")

router.get('/login',async function (ctx, next) {
  var {name,password} = ctx.query;
  if (!name || !password) {
    return ctx.body = {errcode: 1,errmsg: "用户名和密码不能为空"}
  }
  var data = await userModel.findByName(name);
  if (data.length == 1) {
    ctx.body = { errcode: 0, errmsg: "登录成功",data:{
      name,
      password
    }}
  } else {
    return ctx.body = { errcode: 1, errmsg: "找不到该用户" }
  }
})


router.get('/login', async function (ctx, next) {
  var { name, password } = ctx.query;
  if (!name || !password) {
    return ctx.body = { errcode: 1, errmsg: "用户名和密码不能为空" }
  }
  var data = await userModel.findByName(name);
  if (data.length == 1) {
    ctx.body = {
      errcode: 0, errmsg: "登录成功", data: {
        name,
        password
      }
    }
  } else {
    return ctx.body = { errcode: 1, errmsg: "找不到该用户" }
  }
})

module.exports = router;
