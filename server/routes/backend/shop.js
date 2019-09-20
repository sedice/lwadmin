const router = require('koa-router')();
const tools = require("../../utils/tools")

const shopModel = require("../../models/shop")

router.get('/', async function (ctx, next) {
  var {page,pagesize} = ctx.query;
  var data = await shopModel.findAll(page,pagesize);
  ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.post('/', async function (ctx, next) {
  var { name } = ctx.request.body;
  if (!name) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "门店名称不能为空"}
  }
  var data = await shopModel.findByName(name);
  if (data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "门店已存在"}
  }
  await shopModel.create({name});
  ctx.body = {errcode: 0, errmsg: "添加成功"};
})

router.put('/:id', async function (ctx, next) {
  var {id} = ctx.params;
  if (!id) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "id不能为空" }
  }

  var { name } = ctx.request.body;
  if (!name) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "名称不能为空" }
  }

  var data = await shopModel.findById(id);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: `找不到门店`}
  }
  await shopModel.updateById(id,name);
  ctx.body = {errcode: 0, errmsg: "修改成功"}
})

router.delete('/:id', async function (ctx, next) {
  var {id} = ctx.params;
  if (!id) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "id不能为空" }
  }
  var data = await shopModel.findById(id);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "找不到对应门店" }
  }
  await shopModel.removeById(id);
  ctx.body = {errcode: 0, errmsg: `删除成功`}
})

module.exports = router;
