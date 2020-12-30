var mongoose = require("../utils/db");
const tools = require("../utils/tools");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("BatchGoods", schema);
