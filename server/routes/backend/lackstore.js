const router = require('koa-router')();

const lackStoreModel = require("../../models/lackstore")
const shopModel = require("../../models/shop")

router.get('/', async function (ctx, next) {
  var data = await lackStoreModel.findAll(ctx.query);
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
    var data = await lackStoreModel.findById(id);
    ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.delete('/:id', async function (ctx, next) {
    let {id} = ctx.params;
    if (!id) {
        ctx.status = 400;
        return ctx.body = {errcode:1,errmsg:"id 不能为空"};
    }
    await lackStoreModel.removeById(id);
    ctx.body = {errcode: 0, errmsg: "操作成功"}
})


module.exports = router;
