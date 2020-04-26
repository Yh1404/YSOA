module.exports = app => {
  const express = require("express");
  const router = express.Router();

  const Admin = require("../../models/Administrator");
  const User = require("../../models/User");
  const Flow = require("../../models/Flow");

  const SECRET = "iodcowei345c$#%@$!j8esawfj23(&U&n"; //Token密钥

  router.post("/api/admin/login", async (req, res) => {
    const user = await Admin.findOne({ username: req.body.username });
    if (user && !user.isLogin) {
      const isValid = require("bcryptjs").compareSync(req.body.password, user.password);
      if (isValid) {
        const token = require("jsonwebtoken").sign(
          {
            id: String(user._id)
          },
          SECRET
        );
        user.isLogin = true;
        await user.save();
        res.send({ user, token });
      } else {
        res.send({ message: "用户名不存在或密码错误" });
      }
    } else if (user.isLogin) {
      res.send({ message: "该用户已登录" });
    } else {
      res.send({ message: "用户名不存在或密码错误" });
    }
  });
  router.put("/api/admin/logout/:id", async (req, res) => {
    const user = await Admin.findByIdAndUpdate(req.params.id, { isLogin: false });
    if (user) res.send("ok");
  });
  router.get("/api/admin/user", async (req, res) => {
    const users = await User.find().populate("identity").populate("department");
    res.send(users);
  });
  router.post("/api/admin/flow", async (req, res) => {
    const flow = await Flow.create(req.body);
    flow.save();
    res.send("ok");
  });
  app.use("/", router);
};
