const router = require('koa-router')();
const tools = require("../../utils/tools")
const jwt = require('jwt-simple');
const {jwtSecret,tokenExpiresTime}= require('../../utils/conf');
const userModel = require("../../models/frontuser")

// 登录
router.post('/login', async function (ctx, next) {
  var {name,password} = ctx.request.body;
  if (!name || !password) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "参数错误" }
  }

  var data = await userModel.findByName(name);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "没有找到该用户" }
  }

  if (data.password != password) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "密码错误" }
  }

  // 将用户的昵称和权限以token的方式返回去
  let payload = {
      exp:Date.now() + tokenExpiresTime,
      name:data.name,
      shop:data.shop,
      realname:data.realname
  }
  let token = jwt.encode(payload, jwtSecret)

  ctx.body = {
      errcode: 0,
      errmsg:"登录成功",
      data:token
  }
})

module.exports = router;
