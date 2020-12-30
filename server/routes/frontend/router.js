const router = require("koa-router")();

router.use("/frontuser", require("./frontuser").routes());
router.use("/store", require("./store").routes());
router.use("/lackstore", require("./lackstore").routes());
router.use("/replenish", require("./replenish").routes());
router.use("/hotgoodsstore", require("./hotgoodsstore").routes());
router.use("/batch_record", require("./batch_record").routes());
module.exports = router;
