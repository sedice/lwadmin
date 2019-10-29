
const frontUserModel = require("../models/frontuser");

async function checkUser(ctx,next) {
  var url = ctx.request.url;

  // 登录和下载直接跳过
  if (url.includes('login') || url.includes('download')) {
    return await next();
  }

  // 访问的是前端
  if (url.includes('/frontend/')) {
    var data = await frontUserModel.findByNameAndShop(ctx.state.user.name,ctx.state.user.shop);
    if (!data) {
      ctx.body = "需要重新登录"
      ctx.status = 401;
      ctx.throw(401);
    } else {
      await next();
    }
  }
  // 访问的是后端,懒得整,先不整了
  else if (url.includes('/backend/')) {
    await next();
  } else {
    await next();
  }
}

module.exports = checkUser;