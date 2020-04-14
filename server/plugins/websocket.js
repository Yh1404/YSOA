//websocket.js

const ws = require("nodejs-websocket");

let AllUser = new Array();

const createServer = () => {
  let server = ws
    .createServer(connection => {
      connection.on("text", function (result) {
        console.log("用户" + result + "建立连接");
        AllUser.push({
          id: result,
          ws: connection
        });
      });
      connection.on("connect", function (code) {
        console.log("建立连接", code);
        console.log(connection);
      });
      connection.on("close", function (code) {
        console.log("关闭连接", code);
      });
      connection.on("error", function (code) {
        console.log("异常关闭", code);
      });
    })
    .listen(2333, () => {
      console.log("websocket服务已开启...");
    });
  return server;
};

module.exports = createServer();
