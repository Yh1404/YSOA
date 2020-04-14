const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Department"
    }
  },
  {
    toJSON: { virtuals: true }
  }
);
schema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "department",
  justOne: false
});

module.exports = mongoose.model("Department", schema);
