const {createProxyMiddleware} = require('http-proxy-middleware');


module.exports = function (app) {
    app.use('/dealer-api/**', createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {"^/dealer-api": ""}
    }));
}
