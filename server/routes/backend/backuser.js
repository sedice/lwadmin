const router = require('koa-router')();
const tools = require("../../utils/tools")
const jwt = require('jwt-simple');
const {jwtSecret,tokenExpiresTime}= require('../../utils/conf');

const userModel = require("../../models/backuser")

router.get('/', async function (ctx, next){
  var {page,perpage} = ctx.query;
  if (!page || !perpage) return ctx.body  = {errcode: 1, errmsg: "参数错误"};

  var data = await userModel.findAll(page,perpage);
  data = data.map(item => item.name);
  ctx.body = {errcode: 0, errmsg: "查询成功", data}
})

router.post('/', async function (ctx, next) {
  var { name } = ctx.request.body;
  if (!name) return ctx.body = { errcode: 1, errmsg: "参数错误"}
  var data = await userModel.findByName(name);
  if (data) {
    return ctx.body = { errcode: 1, errmsg: "用户已存在"}
  }
  await userModel.create({name});
  ctx.body = {errcode: 0, errmsg: "添加成功"};
})


router.put('/', async function (ctx, next) {
  var { id,newname } = ctx.request.body;
  if (!id || !newname) return ctx.body = { errcode: 1, errmsg: "参数错误" }
  var data = await userModel.findById(id);
  if (!data) {
    return ctx.body = { errcode: 1, errmsg: `找不到用户`}
  }
  await userModel.updateById(id,newname);
  ctx.body = {errcode: 0, errmsg: "修改成功"}
})

router.delete('/', async function (ctx, next) {
  var {id} = ctx.request.body;
  if (!id) return ctx.body = { errcode: 1, errmsg: "id is invalid" };
  var data = await userModel.findById(id);
  if (!data) {
    return ctx.body = { errcode: 1, errmsg: `找不到用户` }
  }
  await userModel.removeById(id);
  ctx.body = {errcode: 0, errmsg: `删除成功`}
})

router.post('/login', async function (ctx, next) {
    var {name,password} = ctx.request.body;
    if (!name || !password) return ctx.body = {errcode: 1, errmsg: "参数错误"};
  
    console.log(name);
    console.log(password);
    var data = await userModel.findByName(name);
    if (!data) {
        return ctx.body = {errcode: 1, errmsg: "没有找到该用户"};
    }
    console.log(data);
    if (data.password == password) {
        let payload = {
            exp:Date.now() + tokenExpiresTime,
            name:data.name,
            identity:data.identity
        }
        let token = jwt.encode(payload, jwtSecret)

        ctx.body = {
            errcode: 0,
            errmsg:"登录成功",
            data:{
                name:data.name,
                realname:data.realname,
                shop:data.shop,
                identity:data.identity,
                token
            }
        }
    } else {
        return ctx.body = {errcode: 1, errmsg: "密码不正确"};
    }
})

module.exports = router;
