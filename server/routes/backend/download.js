const router = require('koa-router')();
const tools = require("../../utils/tools");
const NXlSX = require("node-xlsx");


const storeModel = require("../../models/store")
const lackStoreModel = require("../../models/lackstore")

router.get('/store', async function (ctx, next) {
  var { time_from,time_to } = ctx.query;
  time_from = parseInt(time_from);
  var name = `库存统计单_${getTime(time_from)}_${getTime(time_to)}.xlsx`
  console.log(time_from);
  console.log(time_to);
  var data = await getDownloadData(storeModel, time_from, time_to);
  // 文件名称
  
  ctx.attachment(name); 
  console.log(name)
  ctx.body = NXlSX.build([{ name: "sheetName", data: data }]);
})

function getTime(timeStamp) {
  var time = new Date(timeStamp);
  console.log("********" + time)
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  if (month < 10) month = '0' + month;
  var day = time.getDate();
  if (day < 10) day = '0' + day;
  return "" + year + month + day;
}

async function getDownloadData (model,time_from,time_to) {
  //var dataGroup = await model.find().where('createtime').gte(time_from).lte(time_to).exec();
  var dataGroup = await model.find().exec();

  var monthGroup = getMonth(dataGroup);
  dealEveryData(dataGroup, monthGroup);
  var retArray = [];
  retArray.push(getTitle(monthGroup));
  dataGroup.forEach((data,index)=>{
    getRowData(data, retArray);
  })
  return retArray;
}


function dealEveryData(dataGroup, monthGroup) {
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

function getRowData(data,array) {
  data.datagroup.forEach((item)=>{
    var group = [];
    group.push(array.length); // 序号
    group.push(data.shop); // 门店名称
    group.push(data.creator); // 创建者
    group.push(`${data.shop}_${data.creator}_${getTime(data.createtime)}_${data.createindex}`); // 任务单号
    group.push(item.name); // 创建者
    item.newNumGroup.forEach((num)=>{
      group.push(num);
    })
    array.push(group);
  })
}


function getTitle(monthGroup) {
  var array = [];
  array.push("序号");
  array.push("门店");
  array.push("提交人");
  array.push("任务单号");
  array.push("商品名称");
  monthGroup.forEach((month)=>{
    array.push(month + "月");
  })
  return array;
}

function getMonth(group) {
  var obj = {};
  group.forEach((data)=>{
    data.monthgroup.forEach((month)=>{
      if (!obj[month]) {
        obj[month] = 1;
      }
    })
  })
  var retArray = Object.keys(obj);
  retArray.sort((a,b)=>{
    return Number.parseInt(b) - Number.parseInt(a);
  });
  return retArray;
}

module.exports = router;
