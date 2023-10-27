const express = require('express');
const boom = require('@hapi/boom');

const { cache } = require('../../Utils/constants');
const { createTweetSchema, tweetIdSchema, updateTweetSchema } = require('../../Schemas/TweetsSchema');
const tweetsService = require('../../Services/tweetsService');
const validatorHandler = require('../../middlewares/validator.handler');
const cacheHandler = require('../../middlewares/cache.handler');

const router = express.Router();

router.get('/', cacheHandler(cache.ONE_MINUTE_IN_SECONDS), async (req, res, next) => {
    try {
        // Error Simulado
        // throw new Error('This is an error from the tweets router');
        const tweets = await tweetsService.getTweets();
        res.status(200).json(tweets);   
    } catch (error) {
        next(error)
    }
});

router.get('/:id', validatorHandler(tweetIdSchema, 'params'), cacheHandler(cache.FIVE_MINUTES_IN_SECONDS), async (req, res, next) => {
    try {
        const { id } = req.params;
        const tweets = await tweetsService.getTweet(id);

        if(tweets.length > 0) {
            res.status(200).json(tweets);   
        }else{
            throw boom.notFound('Tweet Not Found');
        }  
    } catch (error) {
        next(error)
    }
});

router.post('/', validatorHandler(createTweetSchema, 'body'), async (req, res, next) => {
    try {
        const body = req.body;
        const tweets = await tweetsService.createTweet(body);
        res.status(201).json(tweets);   
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', validatorHandler(tweetIdSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedRows = await tweetsService.deleteTweet(id);

        if(deletedRows > 0) {
            response.message = 'Tweet Deleted';
            res.status(200).json(response);
        }else{
            throw boom.notFound('Tweet Not Found');
        }    
    } catch (error) {
        next(error)
    }
});

router.patch('/:id', validatorHandler(tweetIdSchema, 'params'), validatorHandler(updateTweetSchema, 'body'), async (req, res, next) => {
    try {
        const response = {};
        const { id } = req.params;
        const { content } = req.body;
        const updatedRows = await tweetsService.updateTweet(id, content);    
        
        if(updatedRows > 0) {
            response.message = 'Tweet Updated';
            response.content = content;
            res.status(200).json(response);
        }else{
            throw boom.notFound('Tweet Not Found');
        } 
    } catch (error) {
        next(error)
    }
});

module.exports = router;
//  module.exports = (app) => app.use('/tweets', router);