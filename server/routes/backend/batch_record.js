const router = require("koa-router")();

const batchRecordModelIn = require("../../models/batch_record_in");
const batchRecordModelOut = require("../../models/batch_record_out");
const shopModel = require("../../models/shop");

router.get("/", async function (ctx, next) {
  const { type = "out" } = ctx.query;
  const model = type === "out" ? batchRecordModelOut : batchRecordModelIn;
  var data = await model.findAll(ctx.query);
  var shopGroup = await shopModel.find({});
  shopGroup = shopGroup.map((val) => val.name);
  data.shopgroup = shopGroup;
  ctx.body = { errcode: 0, errmsg: "查询成功", data };
});

router.get("/:id", async function (ctx, next) {
  let { id } = ctx.params;
  if (!id) {
    ctx.status = 400;
    return (ctx.body = { errcode: 1, errmsg: "id 不能为空" });
  }
  const { type = "out" } = ctx.query;
  const model = type === "out" ? batchRecordModelOut : batchRecordModelIn;
  var data = await model.findOne({ _id: id });
  ctx.body = { errcode: 0, errmsg: "查询成功", data };
});

router.delete("/:id", async function (ctx, next) {
  let { id } = ctx.params;
  if (!id) {
    ctx.status = 400;
    return (ctx.body = { errcode: 1, errmsg: "id 不能为空" });
  }
  const { type = "out" } = ctx.query;
  const model = type === "out" ? batchRecordModelOut : batchRecordModelIn;
  await model.deleteOne({ _id: id });
  ctx.body = { errcode: 0, errmsg: "操作成功" };
});

module.exports = router;
