module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000/api/", //要请求的域名
        pathRewrite: { "^/api": "" }, //通过pathRewrite重写地址，将前缀/api转为/
        ws: true, // 是否启用websockets
        changeOrigin: true //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  }
};
