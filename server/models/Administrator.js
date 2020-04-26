const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    }
  },
  isLogin: {
    type: Boolean
  }
});

module.exports = mongoose.model("Administrator", schema);
