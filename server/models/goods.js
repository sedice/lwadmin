var mongoose = require('../utils/db');
const tools = require("../utils/tools");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  }
})

schema.statics.findAll = async function () {
  return this.find().exec();
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

schema.statics.removeByName = async function (name) {
  return this.deleteOne({name}).exec()
}

schema.statics.removeAll = async function () {
  return this.deleteMany({}).exec()
}
 
schema.statics.updateByName = async function (oldName,newName) {
  return this.update({ name:oldName }, {name:newName}).exec();
}

module.exports = mongoose.model('Goods', schema);