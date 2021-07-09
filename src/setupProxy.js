const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/vi", {
      target: "https://img.youtube.com",
      changeOrigin: true,
    })
  )
}
