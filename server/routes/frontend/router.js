const router = require('koa-router')()

const userRouter = require("./users")

router.use('/user', userRouter.routes());


module.exports = router