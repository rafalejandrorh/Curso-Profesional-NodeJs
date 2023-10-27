const config = require('../Config/index');

function withErrorStack(error, stack, _isStack = config.dev) {
    if(_isStack) {
        return { ...error, stack};
    }
    return error;
}

module.exports = withErrorStack;