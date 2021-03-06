const router = require('koa-router')();

const replenishModel = require("../../models/replenish")
const shopModel = require("../../models/shop")

router.get('/', async function (ctx, next) {
  var data = await replenishModel.findAll(ctx.query);
  var shopGroup = await shopModel.find({});
  shopGroup = shopGroup.map(val => val.name)
  data.shopgroup = shopGroup;
  ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.get('/:id', async function (ctx, next) {
    let {id} = ctx.params;
    if (!id) {
        ctx.status = 400;
        return ctx.body = {errcode:1,errmsg:"id 不能为空"};
    }
    var data = await replenishModel.findById(id);
    ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.delete('/:id', async function (ctx, next) {
    let {id} = ctx.params;
    if (!id) {
        ctx.status = 400;
        return ctx.body = {errcode:1,errmsg:"id 不能为空"};
    }
    await replenishModel.removeById(id);
    ctx.body = {errcode: 0, errmsg: "操作成功"}
})


module.exports = router;
