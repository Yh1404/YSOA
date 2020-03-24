const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    //公文内容
    type: String
  },
  originator: {
    //公文发起人
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  date: {
    type: String
  },
  status: {
    //公文状态，待审批、已审批、审批中
    type: String
  }
});
module.exports = mongoose.model("Document", schema);
