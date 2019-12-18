const router = require('koa-router')();
const tools = require("../../utils/tools")
const userconf = require("../../utils/conf")
const storeModel = require("../../models/store")
const goodsModel = require("../../models/goods")

// 获取自己所有的历史记录
router.get('/',async (ctx,next) => {
    var data = await storeModel.findAll({
        creator:ctx.state.user.name,
        page:1,
        pagesize:100
    });
    ctx.body = {errcode:0,errmsg:"保存成功",data:data.group};
})

// 获取具体的某条信息
router.get('/history/:id',async (ctx,next) => {
    const {id} = ctx.params;
    var data = await storeModel.findById(id);
    data.datagroup.forEach((item,index)=>{
        item.index = index + 1;
    })
    ctx.body = {errcode:0,errmsg:"操作成功",data};
})

function getMonthGroup() {
    // 最近六个月的数据
    const COUNT = userconf.showMonthCount;
    var todayMonth = new Date().getMonth() + 1;
    var group = [];
    for (var i = COUNT; i > 0; i--) {
        group.push(todayMonth);
        todayMonth --;
        if (todayMonth == 0) {
            todayMonth = 12;
        }
    }
    return group;
}

function getInitNumGroup () {
    const COUNT = userconf.showMonthCount;
    var group = [];
    for (var i = 0; i < COUNT; i++) {
        group.push(0);
    }
    return group;
}

// 获取模板
router.get('/template',async (ctx,next) => {
    var goods = await goodsModel.find().select(['name']).exec();
    var datagroup = goods.map((obj,index)=>{
        return {
            index:index + 1,
            name:obj.name,
            numgroup:getInitNumGroup()
        }
    })

    var monthgroup = getMonthGroup();
    ctx.body = {
        errcode:0,
        errmsg:"",
        data:{
            monthgroup,
            datagroup
        }
    }
})

// 添加
router.post('/',async (ctx,next) => {
    let {name,shop} = ctx.state.user;
    let {monthgroup,datagroup} = ctx.request.body;

    datagroup.forEach(item => {
        item.index = undefined;
    })

    var createindex = await storeModel.getNextIndex(name);
    await storeModel.create({
        creator:name,
        shop,
        createindex,
        monthgroup,
        datagroup,
        createtime:Date.now().valueOf(),
    })
    ctx.body = {errcode:0,errmsg:"保存成功",data:"保存成功"};
})


module.exports = router;
