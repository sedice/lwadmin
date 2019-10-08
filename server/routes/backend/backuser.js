const router = require('koa-router')();
const tools = require("../../utils/tools")
const jwt = require('jwt-simple');
const {jwtSecret,tokenExpiresTime}= require('../../utils/conf');
const userModel = require("../../models/backuser")

router.get('/', async function (ctx, next) {
  var {page,pagesize} = ctx.query;
  var data = await userModel.findAll(page,pagesize);
  ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.post('/', async function (ctx, next) {
  var { name ,password,realname,shop} = ctx.request.body;
  if (!name || !password ) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "用户信息不全"}
  }
  // 已有该用户
  var data = await userModel.findByName(name);
  if (data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "用户已存在"}
  }
  await userModel.create({name,password});
  ctx.body = {errcode: 0, errmsg: "添加成功"};
})

router.put('/:id', async function (ctx, next) {
  var {id} = ctx.params;
  if (!id) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "id不能为空" }
  }

  var { name,password} = ctx.request.body;
  if (!name || !password) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "参数错误" }
  }

  var data = await userModel.findById(id);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: `找不到用户`}
  }
  await userModel.updateById(id,ctx.request.body);
  ctx.body = {errcode: 0, errmsg: "修改成功"}
})

router.delete('/:id', async function (ctx, next) {
  var {id} = ctx.params;
  if (!id) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "id不能为空" }
  }
  var data = await userModel.findById(id);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "找不到对应用户" }
  }
  await userModel.removeById(id);
  ctx.body = {errcode: 0, errmsg: `删除成功`}
})

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
      identity:data.identity
  }
  let token = jwt.encode(payload, jwtSecret)

  ctx.body = {
      errcode: 0,
      errmsg:"登录成功",
      data:{
          name:data.name,
          identity:data.identity,
          token
      }
  }
})


module.exports = router;
