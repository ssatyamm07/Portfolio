/**
 * CRA dev server only. Proxies POST /register → Express so the browser stays same-origin
 * (no CORS). Default 5050: on macOS, 5000 is often AirPlay (403 from AirTunes, not Node).
 * Override with REACT_APP_PROXY_TARGET or set PORT in Portfolio/.env to match.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
    const target = process.env.REACT_APP_PROXY_TARGET || 'http://127.0.0.1:5050';

    app.use(
        '/register',
        createProxyMiddleware({
            target,
            changeOrigin: true,
            logLevel: 'warn',
        })
    );
};
