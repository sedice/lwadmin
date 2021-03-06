var mongoose = require("../utils/db");
const tools = require("../utils/tools");

var schema = new mongoose.Schema({
  shop: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  createtime: {
    type: Number,
    required: true,
  },
  createindex: {
    type: Number,
    required: true,
  },
  datagroup: {
    type: [mongoose.SchemaTypes.Mixed],
    require: true,
  },
});

schema.statics.findAll = async function (params) {
  let { page, pagesize, time_from, time_to, shop, creator } = params;

  let getQuery = () => {
    let query = this.find();

    // 按门店查询
    if (shop) {
      query = query.where("shop", shop);
    }

    // 按创建者查找
    if (creator) {
      query = query.where("creator", creator);
    }

    // 创建时间
    if (time_from && time_to) {
      console.log(time_from);
      console.log(time_to);
      query = query.where("createtime").gte(time_from).lte(time_to);
    }
    return query;
  };

  page = Number.parseInt(page);
  pagesize = Number.parseInt(pagesize);

  var total_num = await getQuery().count();
  var total_page = tools.getTotalPage(total_num, pagesize);
  var skipNum = pagesize * (page - 1);
  var group = await getQuery()
    .skip(skipNum)
    .limit(pagesize)
    .sort({ createtime: -1 })
    .select(["creator", "shop", "createtime", "createindex"]);
  var obj = {
    group,
    page,
    pagesize,
    total_page,
    total_num,
  };
  return obj;
};

schema.statics.getNextIndex = async function (creator) {
  var startDate = new Date(new Date().toLocaleDateString()).valueOf();
  var endDate = new Date(
    new Date(new Date().toLocaleDateString()).getTime() +
      24 * 60 * 60 * 1000 -
      1
  ).valueOf();

  let group = await this.find()
    .where({ creator })
    .where("createtime")
    .gte(startDate)
    .lte(endDate)
    .sort({ createindex: -1 })
    .limit(1)
    .exec();
  let nextIndex = 1;
  if (group.length == 1) {
    var data = group[0];
    nextIndex = data.createindex;
    nextIndex += 1;
  }
  return nextIndex;
};

module.exports = mongoose.model("BatchRecordOut", schema);
