const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    clientsUrl: process.env.CORS_ORIGIN || 'https://client.twittr.com'
};