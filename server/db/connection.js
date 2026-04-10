require('../loadEnv')();

const dns = require('dns');
const mongoose = require('mongoose');

const DB = process.env.DATABASE || process.env.MONGODB_URI;

/** Atlas SRV needs working DNS; some resolvers return ESERVFAIL — public DNS often fixes it. */
function applyMongoDnsServers() {
    const raw = process.env.MONGODB_DNS_SERVERS;
    if (!raw || !String(raw).trim()) return;
    try {
        dns.setServers(
            String(raw)
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
        );
    } catch (e) {
        console.warn('Could not apply MONGODB_DNS_SERVERS:', e.message);
    }
}

const connectDB = async () => {
    applyMongoDnsServers();
    if (!DB) {
        console.error(
            'DATABASE (or MONGODB_URI) is not set. Add one of these to Portfolio/.env or server/.env:\n' +
                '  DATABASE=mongodb+srv://...   (from MongoDB Atlas → Connect)'
        );
        process.exit(1);
    }
    try {
        await mongoose.connect(DB);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        if (error.code === 'ENOTFOUND') {
            console.error(
                '   DNS could not resolve the cluster host. Check internet/VPN, or in Atlas use the standard (non-SRV) connection string if SRV is blocked.'
            );
        }
        if (error.code === 'ESERVFAIL') {
            const looksLikeAtlasSrv =
                /mongodb\+srv:\/\//i.test(DB) && /\.mongodb\.net/i.test(DB);
            if (looksLikeAtlasSrv) {
                console.error(
                    '   SRV DNS failed (resolver issue / VPN / corporate network), not a wrong hostname.\n' +
                        '   Add to .env: MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1 then retry (this app applies it before connecting).\n' +
                        '   Or use Atlas standard URI (mongodb://...). Or change system DNS / Wi‑Fi / VPN.'
                );
            } else {
                console.error(
                    '   SRV DNS lookup failed. Check DATABASE host: use the full Atlas hostname from Connect → Drivers.'
                );
            }
        }
        process.exit(1);
    }
};

module.exports = connectDB;
