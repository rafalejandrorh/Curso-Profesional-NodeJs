const connection = require('../Lib/connect');

async function getTweets() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM tweets';
        connection.query(query, (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}

async function getTweet(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM tweets WHERE id = ?';
        connection.query(query, id, (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve(res);
            }
        });
    });
}

async function createTweet(tweet) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tweets SET ?';
        connection.query(query, tweet, (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve({
                    tweetId: res.insertId, 
                    ... tweet
                });
            }
        });
    });
}

async function deleteTweet(id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM tweets WHERE id = ?';
        connection.query(query, id, (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve(res.affectedRows);
            }
        });
    });
}

async function updateTweet(id, content) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE tweets SET content = ? WHERE id = ?';
        connection.query(query, [content, id], (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve(res.affectedRows);
            }
        });
    });
}

module.exports = {
    getTweets,
    getTweet,
    createTweet,
    deleteTweet,
    updateTweet
};