const { config } = require("dotenv");

function cacheHandler(seconds, _isCacheActivated = !config.dev) {
    return (req, res, next) => {
        if(_isCacheActivated) {
            res.set('Cache-Control', `public, max-age=${seconds}`)
        }
        next();
    };
}

module.exports = cacheHandler;