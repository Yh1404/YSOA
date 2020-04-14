const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  type: {
    // 消息类型：催办、
    type: String
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: String
  },
  status: {
    //已读未读
    type: String
  },
  reader: {
    //读者
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("New", schema);
