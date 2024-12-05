// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // This will match requests like /api/maintenance-master-view
    createProxyMiddleware({
      target: 'https://rcm1-eclaimstatus.com', // Backend API server
      changeOrigin: true,
      secure: false,  // Set to true for production (if SSL is used)
    })
  );
};
