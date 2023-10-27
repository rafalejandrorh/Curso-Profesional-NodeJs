const joi = require('@hapi/joi');

const idSchema = joi.number().integer();
const contentSchema = joi.string().max(280);

const tweetIdSchema = {
    id: idSchema.required()
} 

const createTweetSchema = {
    userId: idSchema.required(),
    content: contentSchema.required()
}

const updateTweetSchema = {
    content: contentSchema.required()
}

module.exports = {
    tweetIdSchema,
    createTweetSchema,
    updateTweetSchema
}