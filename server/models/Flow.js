const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  to_users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  description: {
    type: String
  }
});

module.exports = mongoose.model("Flow", schema);
