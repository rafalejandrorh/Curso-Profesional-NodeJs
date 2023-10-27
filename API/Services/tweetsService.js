const tweetsRepository = require('../Repositories/tweetsRepository');

async function getTweets() {
    return await tweetsRepository.getTweets();
}

async function getTweet(id) {
    return await tweetsRepository.getTweet(id);
}

async function createTweet(tweet) {
    return await tweetsRepository.createTweet(tweet);
}

async function deleteTweet(id) {
    return await tweetsRepository.deleteTweet(id);
}

async function updateTweet(id, content) {
    return await tweetsRepository.updateTweet(id, content);
}

module.exports = {
    getTweets, 
    getTweet,
    createTweet,
    deleteTweet,
    updateTweet
};