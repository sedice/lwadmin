const router = require('koa-router')();
const tools = require("../../utils/tools");
const NXlSX = require("node-xlsx");


const storeModel = require("../../models/store")
const lackStoreModel = require("../../models/lackstore")
const hotGoodsStoreModel = require("../../models/hotgoodsstore")

router.get('/store', async function (ctx, next) {
  var { time_from,time_to } = ctx.query;
  time_from = parseInt(time_from);
  time_to = parseInt(time_to);
  var data = await getStoreData(storeModel, time_from, time_to);
  ctx.body = NXlSX.build([{ name: "sheetName", data: data }]);
})

function getTime(timeStamp) {
  var time = new Date(timeStamp);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  if (month < 10) month = '0' + month;
  var day = time.getDate();
  if (day < 10) day = '0' + day;
  return "" + year + month + day;
}

async function getStoreData (model,time_from,time_to) {
  var dataGroup = await model.find().where('createtime').gte(time_from).lte(time_to).exec();
  var monthGroup = [1,2,3,4,5,6,7,8,9,10,11,12];
  dealStoreEveryData(dataGroup, monthGroup);
  var retArray = [];
  retArray.push(getStoreTitle(monthGroup));
  dataGroup.forEach((data,index)=>{
    getStoreRowData(data, retArray);
  })
  return retArray;
}

// 添加新字段
function dealStoreEveryData(dataGroup, monthGroup) {
  dataGroup.forEach((child)=>{
    child.datagroup.forEach((data)=>{
      var newNumGroup = [];
      monthGroup.forEach((month) => {
        newNumGroup.push(getMonthNum(month, child.monthgroup, data.numgroup));
      })
      data.newNumGroup = newNumGroup;
    })
  })
}

function getMonthNum(month,monthgroup,numgroup) {
  var index = -1;
  for (var i = 0; i < monthgroup.length; i ++) {
    if (month == monthgroup[i]) {
      index = i;
      break;
    }
  }

  var num = 0;
  if (index > -1) {
    num = numgroup[index] || 0;
  }
  return num;
}

// store表每行的数据
function getStoreRowData(data,array) {
  data.datagroup.forEach((item)=>{
    var group = [];
    group.push(array.length); // 序号
    var createtime = getTime(data.createtime) 
    group.push(createtime); // date
    group.push(data.shop); // 门店名称
    group.push(data.creator); // 创建者
    group.push(`${data.shop}_${data.creator}_${createtime}_${data.createindex}`); // 任务单号
    group.push(item.name); // 商品名称
    item.newNumGroup.forEach((num)=>{
      group.push(num);
    })
    array.push(group);
  })
}
// store表的标题
function getStoreTitle(monthGroup) {
  var array = [];
  array.push("序号");
  array.push("日期");
  array.push("门店");
  array.push("提交人");
  array.push("任务单号");
  array.push("商品名称");
  monthGroup.forEach((month)=>{
    array.push(month + "月");
  })
  return array;
}



router.get('/lackstore', async function (ctx, next) {
  var { time_from, time_to } = ctx.query;
  time_from = parseInt(time_from);
  time_to = parseInt(time_to);
  var data = await getLackStoreData(lackStoreModel, time_from, time_to);
  ctx.body = NXlSX.build([{ name: "sheetName", data: data }]);
})

async function getLackStoreData(model, time_from, time_to) {
  var dataGroup = await model.find().where('createtime').gte(time_from).lte(time_to).exec();
  var retArray = [];
  retArray.push(getLackStoreTitle());
  dataGroup.forEach((data, index) => {
    getLackStoreRowData(data, retArray);
  })
  return retArray;
}

// store表每行的数据
function getLackStoreRowData(data, array) {
  data.datagroup.forEach((item) => {
    var group = [];
    group.push(array.length); // 序号
    var createtime = getTime(data.createtime)
    group.push(createtime); // 日期
    group.push(data.shop); // 门店名称
    group.push(data.creator); // 创建者
    group.push(`${data.shop}_${data.creator}_${createtime}_${data.createindex}`); // 任务单号
    group.push(item); // 商品名称
    array.push(group);
  })
}

function getLackStoreTitle() {
  var array = [];
  array.push("序号");
  array.push("日期");
  array.push("门店");
  array.push("提交人");
  array.push("任务单号");
  array.push("商品名称");
  return array;
}



router.get('/hotgoodsstore', async function (ctx, next) {
  var { time_from, time_to } = ctx.query;
  time_from = parseInt(time_from);
  time_to = parseInt(time_to);
  var data = await getLackStoreData(hotGoodsStoreModel, time_from, time_to);
  ctx.body = NXlSX.build([{ name: "sheetName", data: data }]);
})

async function getLackStoreData(model, time_from, time_to) {
  var dataGroup = await model.find().where('createtime').gte(time_from).lte(time_to).exec();
  var retArray = [];
  retArray.push(getLackStoreTitle());
  dataGroup.forEach((data, index) => {
    getLackStoreRowData(data, retArray);
  })
  return retArray;
}

// store表每行的数据
function getLackStoreRowData(data, array) {
  data.datagroup.forEach((item) => {
    var group = [];
    group.push(array.length); // 序号
    var createtime = getTime(data.createtime)
    group.push(createtime); // 日期
    group.push(data.shop); // 门店名称
    group.push(data.creator); // 创建者
    group.push(`${data.shop}_${data.creator}_${createtime}_${data.createindex}`); // 任务单号
    group.push(item.name); // 商品名称
    group.push(item.saleNum); // 销售数量
    group.push(item.restNum); // 剩余数量
    array.push(group);
  })
}

function getLackStoreTitle() {
  var array = [];
  array.push("序号");
  array.push("日期");
  array.push("门店");
  array.push("提交人");
  array.push("任务单号");
  array.push("商品名称");
  array.push("当日销售库存");
  array.push("剩余库存");
  return array;
}

module.exports = router;
