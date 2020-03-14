module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost:27017/YSOA", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};
