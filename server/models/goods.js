var mongoose = require('../utils/db');
const tools = require("../utils/tools");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  }
})

schema.statics.findAll = async function (page = 1,pagesize = 10) {
  page = parseInt(page);
  pagesize = parseInt(pagesize);
  var total_num = await this.count();
  var total_page = tools.getTotalPage(total_num,pagesize);
  var skipNum = pagesize*(page - 1);
  var group =  await this.find().skip(skipNum).limit(pagesize).sort({_id:-1});
  var obj = {
    group,
    page,
    pagesize,
    total_page,
    total_num
  }
  return obj;
}

schema.statics.findById = async function (id) {
  return this.findOne({_id:id}).exec();
}

schema.statics.findByName = async function (name) {
  return this.findOne({name}).exec();
}

schema.statics.removeById = async function (id) {
  return this.deleteOne({_id:id}).exec();
}

schema.statics.removeAll = async function () {
  return this.deleteMany({}).exec()
}
 
schema.statics.updateById = async function (id,newName) {
  return this.update({ _id:id }, {name:newName}).exec();
}

module.exports = mongoose.model('Goods', schema);