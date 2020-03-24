const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: String
  }
});
module.exports = mongoose.model("Broadcast", schema);
