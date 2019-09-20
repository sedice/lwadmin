const router = require('koa-router')()

const backRouter = require("./backend/router")
const frontRouter = require("./frontend/router")

router.use('/frontend', frontRouter.routes());
router.use('/backend', backRouter.routes());

module.exports = router