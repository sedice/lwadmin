const router = require('koa-router')()

router.use('/shop', require("./shop").routes());
router.use('/goods', require("./goods").routes());
router.use('/frontuser', require("./frontuser").routes());
router.use('/backuser', require("./backuser").routes());
router.use('/store', require("./store").routes());
router.use('/lackstore', require("./lackstore").routes());
router.use('/replenish', require("./replenish").routes());
router.use('/download', require("./download").routes());
router.use('/hotgoods', require("./hotgoods").routes());

module.exports = router