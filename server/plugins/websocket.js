//websocket.js

const ws = require("nodejs-websocket");

const createServer = () => {
  let server = ws
    .createServer(connection => {
      connection.on("text", function (result) {
        let data = JSON.parse(result);
        switch (data.type) {
          case "LOGIN":
            connection.id = data.id;
            break;
          case "HURRY":
            sendToUser(data.type, data.doc, data.to);
            break;
          case "HeartBeat":
            connection.sendText(JSON.stringify({ type: data.type, content: "心跳正常..." }));
            break;
          default:
            break;
        }
      });
      connection.on("connect", function (code) {
        console.log("建立连接", code);
        console.log(connection);
      });

      connection.on("close", function (code) {
        console.log("关闭连接", code);
      });
      connection.on("error", function (code) {});
    })
    .listen(2333);

  function sendToUser(type, content, to) {
    //向指定用户发送消息
    switch (type) {
      case "HURRY":
        server.connections.forEach(conn => {
          if (conn.id === to) {
            conn.sendText(JSON.stringify({ type: type, content: content }));
          }
        });
        break;
      default:
        break;
    }
  }
  return server;
};
module.exports = createServer();
