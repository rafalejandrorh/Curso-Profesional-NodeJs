const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
    const { output } = boom.notFound('Resource Not Found');
    res.status(output.statusCode).json(output.payload);
}

module.exports = notFoundHandler;