const router = require('koa-router')();
const tools = require("../../utils/tools")

const userModel = require("../../models/frontuser")
const shopModel = require("../../models/shop")

router.get('/', async function (ctx, next) {
  var {page,pagesize} = ctx.query;
  var data = await userModel.findAll(page,pagesize);
  var shopInfo = await shopModel.findAll(1,1000);
  data.shopgroup = shopInfo.group.map(shop => shop.name);
  ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.post('/', async function (ctx, next) {
  var { name ,password,realname,shop} = ctx.request.body;
  if (!name || !password || !realname || !shop) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "用户信息不全"}
  }
  var data = await userModel.findByName(name);
  if (data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "用户已存在"}
  }

  data = await shopModel.findByName(shop);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "找不到该门店"}
  }
  await userModel.create({name,password,realname,shop});
  ctx.body = {errcode: 0, errmsg: "添加成功"};
})

router.put('/:id', async function (ctx, next) {
  var {id} = ctx.params;
  if (!id) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "id不能为空" }
  }

  var { name,shop,password,realname} = ctx.request.body;
  if (!name || !shop || !password || !realname) {
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

module.exports = router;
