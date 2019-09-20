var mongoose = require('../utils/db');
const tools = require("../utils/tools");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  realname: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true,
    defualt:'normal'
  },
})

schema.statics.findAll = async function (page = 1,perpage = 10) {
  page = parseInt(page);
  perpage = parseInt(perpage);
  var totalNum = await this.count();
  var totalPage = tools.getTotalPage(totalNum,perpage);
  var skipNum = perpage*(page - 1);
  var data =  await this.find().skip(skipNum).limit(perpage);
  return data;
}

schema.statics.findById = async function (id) {
  return this.findOne({_id:id}).exec();
}

schema.statics.findByName = async function (name) {
  return this.findOne({name}).exec();
}

schema.statics.removeById = async function (id) {
  return this.deleteOne({_id:id}).exec()
}

schema.statics.removeAll = async function () {
  return this.deleteMany({}).exec()
}
 
schema.statics.updateById = async function (id,newName) {
  return this.update({ _id:id }, {name:newName}).exec();
}

module.exports = mongoose.model('User', schema);