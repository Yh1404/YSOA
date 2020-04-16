module.exports = app => {
  const express = require("express");
  const router = express.Router();

  const server = require("../../plugins/websocket");

  const User = require("../../models/User");
  const Dep = require("../../models/Department");
  const Identity = require("../../models/Identity");
  const Broadcast = require("../../models/Broadcast");
  const Document = require("../../models/Document");
  const Flow = require("../../models/Flow");
  const New = require("../../models/news");

  const SECRET = "iodcowei345c$#%@$!j8esawfj23(&U&n";

  router.get("/api/web/department", async (req, res) => {
    //to get departments
    const departments = await Dep.find().populate("parent").populate("users").lean();
    res.send(departments);
  });

  router.get("/api/web/identity", async (req, res) => {
    //to get identities
    const identity = await Identity.find();
    res.send(identity);
    console.log("查询身份成功...");
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
    const bc = await Broadcast.find();
    res.send(bc);
  });

  router.get("/api/web/flow", async (req, res) => {
    const flows = await Flow.find();
    res.send(flows);
  });

  router.post("/api/web/document", async (req, res) => {
    await Document.insertMany(req.body);
    res.send("ok");
  });

  router.get("/api/web/user/:userID", async (req, res) => {
    //查询用户
    const user = await User.findById(req.query.userID).populate("department").populate("identity");
    res.send(user);
  });

  router.get("/api/web/document/:id?", async (req, res) => {
    //查询公文
    let doc = {};
    if (req.params.id) {
      doc = await Document.findById(req.params.id);
      res.send(doc);
    } else {
      doc = await Document.findOne({}).sort({ _id: -1 }).populate("flow").limit(1);
      res.send(doc);
    }
  });

  router.put("/api/web/cancel_document/:id", async (req, res) => {
    const doc = await Document.findByIdAndUpdate(req.params.id, { status: "CANCEL" });
    res.send(doc);
  });
  router.get("/api/web/hurry/:docID", async (req, res) => {
    const doc = await Document.findById(req.query.docID);
    let hurryNew = await New.create({
      //创建消息model
      type: "HURRY", //催办
      title: "公文催办信息",
      body: `请您尽快批阅公文${doc.title}`,
      date: new Date().toLocaleString(),
      status: "UNREAD",
      reader: doc.currentNodeID
    });
    hurryNew.save(); //写入该消息

    res.send("ok");
  });
  app.use(
    "/",
    function (req, res, next) {
      const token = req.headers.accesstoken;
      require("jsonwebtoken").verify(token, SECRET, function (err, data) {
        if (data === req.cookies.user) {
          next();
        }
      });
      next();
    },
    router
  );
};
