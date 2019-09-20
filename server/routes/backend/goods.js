const router = require('koa-router')();
const tools = require("../../utils/tools")

const goodsModel = require("../../models/goods")

router.get('/', async function (ctx, next) {
  var data = await goodsModel.findAll();
  data = data.map(item => item.name);
  ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.post('/', async function (ctx, next) {
  var { name } = ctx.request.body;
  if (!name) return ctx.body = { errcode: 1, errmsg: "商品名称不能为空"}
  var data = await goodsModel.findByName(name);
  if (data) {
    return ctx.body = { errcode: 1, errmsg: "商品已存在"}
  }
  await goodsModel.create({name});
  ctx.body = {errcode: 0, errmsg: "添加成功"};
})

router.put('/', async function (ctx, next) {
  var { oldname,newname } = ctx.request.body;
  if (!oldname || !newname) return ctx.body = { errcode: 1, errmsg: "原商品名称和新商品名称不能为空" }
  var data = await goodsModel.findByName(oldname);
  if (!data) {
    return ctx.body = { errcode: 1, errmsg: `找不到商品: ${oldname}`}
  }
  await goodsModel.updateByName(oldname,newname);
  ctx.body = {errcode: 0, errmsg: "修改成功"}
})

router.delete('/', async function (ctx, next) {
  var {id} = ctx.request.body;
  if (!id) return {
    ctx.status = 400;
    ctx.body = { errcode: 1, errmsg: "商品名称不能为空" } 
  }
  var data = await goodsModel.findByName(name);
  if (!data) {
    return ctx.body = { errcode: 1, errmsg: `找不到商品: ${name}` }
  }
  await goodsModel.removeByName(name);
  ctx.body = {errcode: 0, errmsg: `删除 ${name} 成功`}
})

module.exports = router;
