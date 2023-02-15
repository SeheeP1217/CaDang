const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/v1", {
      target: "http://i8a808.p.ssafy.io/",
      changeOrigin: true,
    })
  );
};
