const { createProxyMiddleware } = require('http-proxy-middleware');

const URL = '/.netlify/functions/*';

module.exports = function(app) {
  app.use(
    URL,
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
    })
  );
};
