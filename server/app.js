const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const Moment = require("moment");
const koaJwt = require('koa-jwt')


const router = require("./routes/router");
const jwtSecret = require('./utils/conf').jwtSecret;


app.use(logger((str) => {               
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
}));

// token过期
app.use(koaJwt({secret:jwtSecret}).unless({
  path: ['/backend/backuser/login',
  '/frontend/frontuser/login', 
  '/backend/download/store', 
  '/backend/download/lackstore', 
  '/backend/download/store']
}))

// 分析body
app.use(bodyparser({enableTypes:['json', 'form', 'text']}))
// json支持
app.use(json()) 
// 日志
app.use(require('koa-static')(__dirname + '/public'))

app.use(router.routes(), router.allowedMethods())
module.exports = app
