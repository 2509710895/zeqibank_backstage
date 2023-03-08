const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://127.0.0.1:8003',
            // target: 'http://69.235.141.94:8888',
            // changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    )
}