const router = require('koa-router')()

router.use('/frontuser', require("./frontuser").routes());
router.use('/store', require("./store").routes());
router.use('/lackstore', require("./lackstore").routes());
router.use('/replenish', require("./replenish").routes());

module.exports = router