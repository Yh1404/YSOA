//封装websocket

export function createWebSocket(wsUrl, that) {
  try {
    let ws = new WebSocket(wsUrl);
    initEventHandle(ws, wsUrl, that);
    return ws;
  } catch (e) {
    //重新连接
    reconnect(wsUrl);
  }
} //封装websocket的那几个接口函数
function initEventHandle(ws, wsUrl, that) {
  ws.onclose = function() {
    console.info("连接关闭");
    reconnect(wsUrl);
  };
  ws.onerror = function() {
    console.info("传输异常");
    reconnect(wsUrl);
  };
  ws.onopen = function() {
    //心跳检测重置
    ws.send(JSON.stringify({ type: "LOGIN", id: sessionStorage.getItem("id") }));
    heartCheck.reset().start(ws);
  };

  ws.onmessage = async function(event) {
    const data = JSON.parse(event.data);
    let res;
    switch (data.type) {
      case "HURRY":
        res = await that.$axios.get(`/web/document/${data.content}`);
        that.$alert(`请您尽快完成公文：${res.data.title}的审批`, `催办消息`, {
          confirmButtonText: "确定"
        });
        break;
      case "REJECT":
        res = await that.$axios.get(`/web/document/${data.content}`);
        that.$alert(`您的公文：${res.data.title} 请求被驳回`, `消息`, {
          confirmButtonText: "确定"
        });
        break;
      case "HeartBeat":
        console.log(data.content);
        break;
      default:
        break;
    }
    //如果获取到消息，心跳检测重置
    heartCheck.reset().start(ws);
  };
}
function reconnect(url) {
  //避免重复连接
  let lockReconnect = false;
  if (lockReconnect) return;
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  setTimeout(function() {
    console.info("尝试重连..." + new Date().toLocaleString());
    createWebSocket(url);
    lockReconnect = false;
  }, 5000);
}
//心跳检测,每5s心跳一次
let heartCheck = {
  timeout: 5000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function() {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function(ws) {
    let self = this;
    this.timeoutObj = setTimeout(function() {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      ws.send(JSON.stringify({ type: "HeartBeat", date: new Date().toDateString() }));
      self.serverTimeoutObj = setTimeout(function() {
        //如果超过一定时间还没重置，说明后端主动断开了
        ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了. //如果直接执行reconnect 会触发onclose导致重连两次
      }, self.timeout);
    }, this.timeout);
  }
};
