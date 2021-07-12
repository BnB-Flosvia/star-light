const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/vi", {
      target: "https://img.youtube.com",
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware("/media/cover_image", {
      target: "https://star-light.s3.ap-northeast-2.amazonaws.com",
      changeOrigin: true,
    })
  )
}
