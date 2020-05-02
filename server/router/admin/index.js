module.exports = app => {
  const express = require("express");
  const router = express.Router();

  const Admin = require("../../models/Administrator");
  const User = require("../../models/User");
  const Flow = require("../../models/Flow");
  const Broadcast = require("../../models/Broadcast");
  const Dep = require("../../models/Department");

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
  router.get("/api/admin/user/:id?", async (req, res) => {
    if (req.params.id) {
      const user = await User.findById(req.params.id);
      res.send(user);
    } else {
      const users = await User.find().populate("identity").populate("department");
      res.send(users);
    }
  });
  router.post("/api/admin/flow", async (req, res) => {
    //添加流程API
    const flow = await Flow.create(req.body);
    flow.save();
    res.send("ok");
  });
  router.get("/api/admin/flow/:id?", async (req, res) => {
    if (req.params.id) {
      const flow = await Flow.findById(req.params.id).populate("to_users");
      res.send(flow);
    } else {
      const flows = await Flow.find({}).populate("to_users");
      res.send(flows);
    }
  });
  router.put(`/api/admin/flow/:id`, async (req, res) => {
    await Flow.findByIdAndUpdate(req.params.id, req.body);
    res.send("ok");
  });
  router.delete(`/api/admin/flow/:id`, async (req, res) => {
    await Flow.findByIdAndDelete(req.params.id);
    res.send("ok");
  });
  router.put(`/api/admin/user/:id`, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send("ok");
  });
  router.delete(`/api/admin/user/:id`, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send("ok");
  });
  router.delete(`/api/admin/broadcast/:id`, async (req, res) => {
    await Broadcast.findByIdAndDelete(req.params.id);
    res.send("ok");
  });
  router.post("/api/admin/broadcast", async (req, res) => {
    //添加流程API
    const bc = await Broadcast.create(req.body);
    bc.save();
    res.send("ok");
  });
  router.get("/api/admin/department", async (req, res) => {
    //to get departments
    const departments = await Dep.find();
    res.send(departments);
  });
  router.delete(`/api/admin/department/:id`, async (req, res) => {
    await Dep.findByIdAndDelete(req.params.id);
    res.send("ok");
  });
  app.use("/", router);
};
