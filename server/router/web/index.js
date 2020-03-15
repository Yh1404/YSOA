module.exports = app => {
  const express = require("express");
  const router = express.Router();

  const User = require("../../models/User");
  const Dep = require("../../models/Department");
  const Role = require("../../models/Role");
  const Identity = require("../../models/Identity");

  router.get("/api/web/chooseinfo", async (req, res) => {
    //to get identities && departments
    const identities = await Identity.find();
    const departments = await Dep.find().populate("parent");
    res.send([identities, departments]);
    console.log("查询身份和部门成功...");
  });

  router.post("/api/web/register", async (req, res) => {
    try {
      const user = await User.create(req.body);
      await user.save();
      res.send("ok");
    } catch {
      res.status(400).send({ error: "表单填写有误！" });
    }
  });

  app.use("/", router);
};
