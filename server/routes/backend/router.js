const router = require('koa-router')()

const shopRouter = require("./shop.js")
const goodsRouter = require("./goods.js")
const frontUserRouter = require("./frontuser.js")
const backUserRouter = require("./backuser.js")

router.use('/shop', shopRouter.routes());
router.use('/goods', goodsRouter.routes());
router.use('/frontuser', frontUserRouter.routes());
router.use('/user', backUserRouter.routes());

module.exports = router