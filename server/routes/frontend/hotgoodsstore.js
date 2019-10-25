const router = require('koa-router')();
const tools = require("../../utils/tools")
const userconf = require("../../utils/conf")
const hotGoodsStoreModel = require("../../models/hotgoodsstore")
const hotGoodsModel = require("../../models/hotgoods")

// 获取自己所有的历史记录
router.get('/',async (ctx,next) => {
    var data = await hotGoodsStoreModel.findAll({
        name:ctx.state.user.name,
        page:1,
        pagesize:100
    });
    ctx.body = {errcode:0,errmsg:"保存成功",data:data.group};
})

// 获取具体的某条信息
router.get('/history/:id',async (ctx,next) => {
    const {id} = ctx.params;
    var data = await hotGoodsStoreModel.findById(id);
    data.datagroup.forEach((item,index)=>{
        item.index = index + 1;
    })
    ctx.body = {errcode:0,errmsg:"操作成功",data};
})


// 获取模板
router.get('/template',async (ctx,next) => {
    var goods = await hotGoodsModel.find().select(['name']).exec();
    var datagroup = goods.map((obj,index)=>{
        return obj.name;
    })
    ctx.body = {
        errcode:0,
        errmsg:"",
        data:{
            datagroup
        }
    }
})

// 添加
router.post('/',async (ctx,next) => {
    let {name,shop} = ctx.state.user;
    let {datagroup} = ctx.request.body;

    var createindex = await hotGoodsStoreModel.getNextIndex(name);
    await hotGoodsStoreModel.create({
        creator:name,
        shop,
        createindex,
        datagroup,
        createtime:Date.now().valueOf(),
    })
    ctx.body = {errcode:0,errmsg:"保存成功",data:"保存成功"};
})


module.exports = router;
