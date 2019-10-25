const router = require('koa-router')();
const tools = require("../../utils/tools")

const hotGoodsModel = require("../../models/hotgoods");
const goodsModel = require("../../models/goods");

router.get('/', async function (ctx, next) {
  var {page,pagesize} = ctx.query;
  var data = await hotGoodsModel.findAll(page,pagesize);
  var shopgroup = await goodsModel.findAll(1,999);
  shopgroup = shopgroup.group.map(val => val.name);
  data.shopgroup = shopgroup;
  ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.post('/', async function (ctx, next) {
  var { name } = ctx.request.body;
  if (!name) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "商品名称不能为空"}
  }
  var data = await hotGoodsModel.findByName(name);
  if (data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "商品已存在"}
  }
  await hotGoodsModel.create({name});
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

  var data = await hotGoodsModel.findById(id);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: `找不到商品`}
  }
  await hotGoodsModel.updateById(id,name);
  ctx.body = {errcode: 0, errmsg: "修改成功"}
})

router.delete('/:id', async function (ctx, next) {
  var {id} = ctx.params;
  if (!id) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "id不能为空" }
  }
  var data = await hotGoodsModel.findById(id);
  if (!data) {
    ctx.status = 400;
    return ctx.body = { errcode: 1, errmsg: "找不到对应商品" }
  }
  await hotGoodsModel.removeById(id);
  ctx.body = {errcode: 0, errmsg: `删除成功`}
})

module.exports = router;
