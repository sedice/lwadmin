var mongoose = require('../utils/db');
const tools = require("../utils/tools");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true,
    default:'normal'
  },
})

schema.statics.findAll = async function (page = 1,pagesize = 10) {
  page = parseInt(page);
  pagesize = parseInt(pagesize);

  var getQuery = () => {
    return this.find().where('identity').ne('admin')
  }
  
  var total_num = await getQuery().count();
  var total_page = tools.getTotalPage(total_num,pagesize);
  var skipNum = pagesize*(page - 1);
  var group = await getQuery().skip(skipNum).limit(pagesize);
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
  return this.deleteOne({_id:id}).exec()
}

schema.statics.removeAll = async function () {
  return this.deleteMany({}).exec()
}
 
schema.statics.updateById = async function (id,params) {
  return this.update({ _id:id }, {
    name:params.name,
    password:params.password,
    identity: params.identity
  }).exec();
}

module.exports = mongoose.model('BackUser', schema);