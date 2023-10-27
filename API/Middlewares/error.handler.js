const config = require('../Config/index');
const boom = require('@hapi/boom');
const withErrorStack = require('../Utils/withErrorStack');

function logErrors (err, req, res, next) {
    console.error(err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    /*
    if(!err.isBoom) {
        next(boom.badImplementation(err))
    }
    next(err);
    */
}
  
function errorHandler(err, req, res, next) {
    const { stack, output } = err;
    res.status(output.statusCode)
    res.json(withErrorStack(output.payload, stack));
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }else{
        next(boom.badImplementation(err));
    }
    next(err);
}
  
module.exports = { 
    logErrors,
    wrapErrors, 
    errorHandler, 
    boomErrorHandler 
}