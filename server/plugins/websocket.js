//websocket.js

const ws = require("nodejs-websocket");

const AllUSer = new Array();

const createServer = () => {
  let server = ws
    .createServer(connection => {
      connection.on("text", function (result) {
        let data = JSON.parse(result);
        switch (data.type) {
          case "LOGIN":
            if (AllUSer.indexOf(data.id) > -1) return;
            else {
              AllUSer.push(data.id);
              connection.id = data.id;
            }
            break;
          case "HURRY":
            sendToUser(data.doc, data.to);
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

      connection.on("error", function (code) {
        console.log("异常关闭", code);
      });
    })
    .listen(2333);
  function sendToUser(content, to) {
    //向指定用户发送消息
    server.connections.forEach(conn => {
      if (conn.id === to) {
        conn.sendText(content);
      }
    });
    return server;
  }
};
module.exports = createServer();
