module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost:27017/YSOA", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  console.log("数据库连接成功");
};
