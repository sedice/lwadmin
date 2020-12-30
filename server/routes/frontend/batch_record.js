const router = require("koa-router")();
const tools = require("../../utils/tools");
const userconf = require("../../utils/conf");
const batchRecordModelIn = require("../../models/batch_record_in");
const batchRecordModelOut = require("../../models/batch_record_out");
const batchGoodsModel = require("../../models/batch_goods");

router.get("/template", async (ctx, next) => {
  var data = await batchGoodsModel.find();
  ctx.body = { errcode: 0, errmsg: "查询成功", data: data };
});

// 获取自己所有的历史记录
router.get("/", async (ctx, next) => {
  const { type = "out" } = ctx.query;
  const isOut = type === "out" ? true : false;
  const model = isOut ? batchRecordModelOut : batchRecordModelIn;
  var data = await model.findAll({
    creator: ctx.state.user.name,
    page: 1,
    pagesize: 100,
  });
  ctx.body = { errcode: 0, errmsg: "保存成功", data: data.group };
});

// 获取具体的某条信息
router.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;
  const { type = "out" } = ctx.query;
  const isOut = type === "out" ? true : false;
  const model = isOut ? batchRecordModelOut : batchRecordModelIn;
  var data = await model.findOne({ _id: id });
  data.datagroup.forEach((item, index) => {
    item.index = index + 1;
  });
  ctx.body = { errcode: 0, errmsg: "操作成功", data };
});

// 添加
router.post("/", async (ctx, next) => {
  let { name, shop } = ctx.state.user;
  const { datagroup } = ctx.request.body;
  const { type = "out" } = ctx.query;
  const isOut = type === "out" ? true : false;
  const model = isOut ? batchRecordModelOut : batchRecordModelIn;
  var createindex = await model.getNextIndex(name);
  await model.create({
    creator: name,
    shop,
    createindex,
    datagroup,
    createtime: Date.now().valueOf(),
  });
  ctx.body = { errcode: 0, errmsg: "保存成功", data: "保存成功" };
});

module.exports = router;
