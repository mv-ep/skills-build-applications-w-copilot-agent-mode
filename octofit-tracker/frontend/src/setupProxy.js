const { createProxyMiddleware } = require('http-proxy-middleware');

const target = 'http://localhost:8000';

module.exports = function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'warn',
    })
  );
};