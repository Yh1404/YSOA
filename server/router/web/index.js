module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const server = require("../../plugins/websocket");
  const jwt = require("jsonwebtoken");

  //mongo model
  const User = require("../../models/User");
  const Dep = require("../../models/Department");
  const Identity = require("../../models/Identity");
  const Broadcast = require("../../models/Broadcast");
  const Document = require("../../models/Document");
  const Flow = require("../../models/Flow");
  const New = require("../../models/news");

  const SECRET = "iodcowei345c$#%@$!j8esawfj23(&U&n"; //Token密钥

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

  router.get("/api/web/broadcast", verifyToken, async (_req, res) => {
    const bc = await Broadcast.find();
    res.send(bc);
  });

  router.get("/api/web/flow", verifyToken, async (req, res) => {
    const flows = await Flow.find();
    res.send(flows);
  });

  router.post("/api/web/document", verifyToken, async (req, res) => {
    await Document.insertMany(req.body);
    res.send("ok");
  });

  router.get("/api/web/user/:userID", verifyToken, async (req, res) => {
    //查询用户
    const user = await User.findById(req.query.userID).populate("department").populate("identity");
    res.send(user);
  });

  router.get("/api/web/document/:id?", verifyToken, async (req, res) => {
    //查询公文,
    //传入用户ID则查询该用户的公文
    //传入公文ID则查询该公文
    //不携带ID则查询最新的一条公文
    let doc;
    let result = new Array();
    if (req.params.id) {
      doc =
        (await Document.findById(req.params.id)
          .populate({ path: "originator", model: "User" })
          .populate({ path: "currentNodeID", model: "User" })
          .lean()) ||
        (await Document.find({})
          .populate({
            path: "flow",
            model: "Flow"
          })
          .populate({ path: "originator", model: "User" })
          .populate({ path: "currentNodeID", model: "User" })
          .sort({ _id: -1 })
          .lean());
      for (let i = 0; i < doc.length; i++) {
        for (let j = 0; j < doc[i].flow.to_users.length; j++) {
          //若用户为公文的发起人过经办人，则将该公文反馈给用户
          if (doc[i].originator._id == req.params.id || doc[i].flow.to_users[j]._id == req.params.id) {
            result.push(doc[i]);
            break;
          }
        }
      }
      if (result.length == 0) {
        res.send(doc);
      } else res.send(result);
    } else {
      doc = await Document.findOne()
        .sort({ _id: -1 })
        .populate("flow")
        .populate({ path: "originator", model: "User" })
        .populate({ path: "currentNodeID", model: "User" })
        .limit(1);
      res.send(doc);
    }
  });

  router.get("/api/web/hurry/:docID", verifyToken, async (req, res) => {
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

  router.put("/api/web/document/:id", verifyToken, async (req, res) => {
    await Document.findByIdAndUpdate(req.params.id, req.body.change);
    res.send("ok");
  });

  router.get("/api/web/news/:id", verifyToken, async (req, res) => {
    const news = await New.find({ reader: req.params.id }).sort({ _id: -1 });
    res.send(news);
  });

  router.put("/api/web/news/:id", verifyToken, async (req, res) => {
    await New.findByIdAndUpdate(req.params.id, { status: "READ" });
    res.send("消息已读");
  });
  app.use("/", router);

  function verifyToken(req, res, next) {
    //验证Token中间件
    const token = req.headers.accesstoken;
    jwt.verify(token, SECRET, function (_err, decode) {
      if (_err) return;
      next();
    });
  }
};
