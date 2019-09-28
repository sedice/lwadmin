const router = require('koa-router')()

const shopRouter = require("./shop.js")
const goodsRouter = require("./goods.js")
const frontUserRouter = require("./frontuser.js")

router.use('/shop', shopRouter.routes());
router.use('/goods', goodsRouter.routes());
router.use('/frontuser', frontUserRouter.routes());

module.exports = router