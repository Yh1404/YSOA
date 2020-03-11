module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "",
        changeOrgin: true,
        pathRewrite: {
          "^api/": ""
        }
      }
    }
  }
};
