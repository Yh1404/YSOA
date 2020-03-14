const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  role: {
    type: String,
    unique: true,
    default: "user"
  }
});

module.exports = mongoose.model("Role", schema);
