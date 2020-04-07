module.exports = app => {
  const express = require("express");
  const router = express.Router();

  const User = require("../../models/User");
  const Dep = require("../../models/Department");
  const Identity = require("../../models/Identity");
  const Broadcast = require("../../models/Broadcast");
  const Document = require("../../models/Document");

  const SECRET = "iodcowei345c$#%@$!j8esawfj23(&U&n";

  router.get("/api/web/chooseinfo", async (req, res) => {
    //to get identities && departments
    const identities = await Identity.find();
    const departments = await Dep.find().populate("parent");
    res.send([identities, departments]);
    console.log("查询身份和部门成功...");
  });

  router.post("/api/web/register", async (req, res) => {
    //register user api
    try {
      const user = await User.create(req.body);
      await user.save();
      res.send("ok");
    } catch {
      res.status(400).send({ error: "表单填写有误！" });
    }
  });

  router.post("/api/web/login", async (req, res) => {
    //user login api
    const user = await User.findOne({ username: req.body.username }).populate("identity").populate("department");
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

  router.put("/api/web/logout/:id", async (req, res) => {
    // exit
    const user = await User.findByIdAndUpdate(req.params.id, { isLogin: false });
    if (user) res.send("ok");
  });

  router.get("/api/web/broadcast", async (req, res) => {
    const news = await Broadcast.find();
    res.send(news);
  });

  app.use("/", router);
};
