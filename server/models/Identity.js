const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
});

schema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "identity",
  justOne: false
});

module.exports = mongoose.model("Identity", schema);
