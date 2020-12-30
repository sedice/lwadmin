const router = require("koa-router")();
const tools = require("../../utils/tools");

const batchGoodsModel = require("../../models/batch_goods");

router.get("/", async function (ctx, next) {
  var data = await batchGoodsModel.find({});
  console.log(data);
  ctx.body = { errcode: 0, errmsg: "查询成功", data };
});

router.post("/", async function (ctx, next) {
  var { name } = ctx.request.body;
  if (!name) {
    ctx.status = 400;
    return (ctx.body = { errcode: 1, errmsg: "商品名称不能为空" });
  }
  var data = await batchGoodsModel.findOne({ name });
  console.log(data);
  if (data) {
    ctx.status = 400;
    return (ctx.body = { errcode: 1, errmsg: "商品已存在" });
  }
  await batchGoodsModel.create({ name });
  ctx.body = { errcode: 0, errmsg: "添加成功" };
});

router.delete("/:id", async function (ctx, next) {
  var { id } = ctx.params;
  if (!id) {
    ctx.status = 400;
    return (ctx.body = { errcode: 1, errmsg: "id不能为空" });
  }
  var data = await batchGoodsModel.find({ _id: id });
  if (!data) {
    ctx.status = 400;
    return (ctx.body = { errcode: 1, errmsg: "找不到对应商品" });
  }
  await batchGoodsModel.deleteOne({ _id: id });
  ctx.body = { errcode: 0, errmsg: `删除成功` };
});

module.exports = router;
