const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  to_users: {
    type: Array
  }
});

module.exports = mongoose.model("Flow", schema);
