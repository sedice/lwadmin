var mongoose = require('../utils/db');
const tools = require("../utils/tools");

var userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  identity:{
    type:Number,
    required:true,
    default:1
  },
  shop:{
    type: String,
    required: true
  }
})

userSchema.statics.findAll = async function () {
  return new Promise ((resolve,reject)=> {
    this.find(function (err,data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

userSchema.statics.findByName = async function (name) {
  return new Promise((resolve, reject) => {
    this.find({name},function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

module.exports = mongoose.model('FrontUser',userSchema);