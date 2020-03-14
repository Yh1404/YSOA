const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String,
    set(value) {
      return require("bcryptjs").hashSync(value, 10);
    }
  },
  telephone: {
    type: Number,
    unique: true
  },
  birth: {
    type: String
  },
  gender: {
    type: String
  },
  department: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Department"
  },
  identity: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Identity"
  },
  role: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Role"
  }
});

module.exports = mongoose.model("User", schema);
