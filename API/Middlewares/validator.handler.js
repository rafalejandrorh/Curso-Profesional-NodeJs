const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

function validatorHandler(schema, property) {
	return (req, res, next) => {
		const data = req[property];
		const { error } = joi.object(schema).validate(data, { abortEarly: false });
		if (error) {
			const { output } = boom.badRequest(error);
			res.status(output.statusCode).json(output.payload);
		}
		next();
	}
}

module.exports = validatorHandler;
