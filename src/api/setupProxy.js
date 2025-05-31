const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://atp-apis.onrender.com",
      changeOrigin: true,
      secure: false,
    })
  );
};