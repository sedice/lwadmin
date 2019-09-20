const router = require('koa-router')()

const shopRouter = require("./shop.js")
const userRouter = require("./user.js")

router.use('/shop', shopRouter.routes());
router.use('/user', userRouter.routes());


module.exports = router