const proxy = require('http-proxy-middleware').createProxyMiddleware;

module.exports = function (app) {
    app.use(proxy(`/auth/**`, { target: 'https://googlesheet-yuetcisb.b4a.run' }));
};