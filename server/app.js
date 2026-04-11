require('./loadEnv')();

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const router = require('./routes/router');

const app = express();
/** Default 5050: macOS often reserves 5000 for AirPlay (responds 403, not your API). Render still sets PORT. */
const port = Number(process.env.PORT) || 5050;

/**
 * CORS: set CLIENT_ORIGINS in Render (comma-separated) for deployed front-ends.
 * Local dev (http://localhost / 127.0.0.1, any port) is always allowed so you
 * can call the hosted API from Create React App, Vite, etc.
 */
const defaultOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://say-hi-satyam.vercel.app'
];
const envOrigins = process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
const allowedOrigins = envOrigins.length ? envOrigins : defaultOrigins;

function isLocalDevOrigin(origin) {
    try {
        const u = new URL(origin);
        if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
        const h = u.hostname.toLowerCase();
        return (
            h === 'localhost' ||
            h === '127.0.0.1' ||
            h === '::1' ||
            h === '[::1]'
        );
    } catch {
        return false;
    }
}

/** Render / most hosts set NODE_ENV=production. Local `node app.js` often has no NODE_ENV — treat as dev. */
const isProduction = process.env.NODE_ENV === 'production';

const corsDev = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
    ],
    credentials: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
};

const corsProd = {
    origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        if (isLocalDevOrigin(origin)) return callback(null, true);
        console.warn('CORS blocked origin:', origin);
        return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
    ],
    credentials: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
};

function corsDelegate(req, callback) {
    callback(null, isProduction ? corsProd : corsDev);
}

app.use(cors(corsDelegate));

app.use(express.json({ limit: '100kb' }));

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.use(router);

(async function start() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(
                isProduction
                    ? `CORS: production allow-list + local hosts. Origins: ${allowedOrigins.join(', ') || '(set CLIENT_ORIGINS)'}`
                    : 'CORS: non-production — reflecting any Origin (safe for local dev only). Set NODE_ENV=production when deploying.'
            );
        });
    } catch (e) {
        console.error('Failed to start server:', e);
        process.exit(1);
    }
})();
