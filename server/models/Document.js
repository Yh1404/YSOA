const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    //公文内容
    type: String
  },
  currentNodeID: {
    //currrent node id
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  originator: {
    //公文发起人
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  cc: {
    //抄送
    type: Array
  },
  flow: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Flow"
  },
  date: {
    type: String
  },
  status: {
    //公文状态，待审批、同意、驳回、审批中、
    type: String
  }
});
module.exports = mongoose.model("Document", schema);
