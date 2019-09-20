const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const Moment = require("moment");
const jwt = require('jwt-simple');
const koaJwt = require('koa-jwt')


const router = require("./routes/router");

const jwtSecret = require('./utils/conf').jwtSecret;


app.use(logger((str) => {               
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
}));

// app.use(async(ctx,next)=>{
//   try {
//     await next();
//     if (ctx.status == 404) {
//       ctx.throw(404);
//     }
//   } catch (err) {
//     ctx.status = err.status || 500;
//     console.log(err);
//     if (ctx.status == 404) {
//       ctx.body = "无此接口"
//     } else if (ctx.status == 401) {
//       ctx.body = "token过期,请重新登录"
//     } else {
//       console.log(err);
//       ctx.body = "服务器端错误"
//     }
//   }
// })

// token过期
app.use(koaJwt({secret:jwtSecret}).unless({
  path:['/backend/user/login']
}))

// 分析body
app.use(bodyparser({enableTypes:['json', 'form', 'text']}))
// json支持
app.use(json()) 
// 日志
app.use(require('koa-static')(__dirname + '/public'))

app.use(router.routes(), router.allowedMethods())
module.exports = app
