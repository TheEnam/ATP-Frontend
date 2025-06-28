const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://atp-backend-4578.onrender.com",
      changeOrigin: true,
      secure: false,
    })
  );
};