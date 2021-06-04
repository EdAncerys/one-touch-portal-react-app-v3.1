const { createProxyMiddleware } = require('http-proxy-middleware');

const URL = '/.netlify/functions/';

module.exports = function(app) {
  app.use(
    URL,
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
    })
  );
};

  
// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(proxy('/.netlify/functions/', { 
//     target: 'http://localhost:9000/',
//     "pathRewrite": {
//       "^/\\.netlify/functions": ""
//     }
//   }));
// };