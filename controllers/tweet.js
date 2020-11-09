var mysql = require('mysql');

const create = (req, res, con) => {

    const { message, user_id } = req.body;

    if (!message || !user_id || message.length > 255) {
        return res.status(400).json('incorrect form submission');
    }

    // make check if user exists 

    var sql_insert_tweet = mysql.format("INSERT INTO tweets (tweet, user_id ) VALUES ('" + message + "','" + user_id + "')");

    con.query(sql_insert_tweet, function (err, result) {
        if (err) {
            console.log(err)
            return res.status(400).json('unable to create tweet')
        };
        return res.status(200).json('Created Tweet');
    });

}

const update = (req, res, con) => {


    const { message, user_id, tweet_id } = req.body;

    if (!message || !user_id || message.length > 255) {
        return res.status(400).json('incorrect form submission');
    }

    // make check if user exists 

    var sql_insert_tweet = mysql.format('UPDATE tweets SET tweet = ? WHERE id = ? LIMIT 1', [message, tweet_id]);

    con.query(sql_insert_tweet, function (err, result) {
        if (err) {
            throw err;
        };
        // check if tweet exists and query returns only one result
        if (result.affectedRows == 0) {
            return res.status(404).json('Tweet not found');
        }
        else
            return res.status(200).json('Tweet Updated');
    });

}

const read = (req, res, con) => {

    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json('incorrect form submission');
    }

    // make check if user exists 

    // should load in decesdening order by date with created_at once implemented
    let sql_read_tweets = mysql.format('SELECT * FROM tweets WHERE user_id = ? LIMIT 5', [user_id]);

    con.query(sql_read_tweets, function (err, result) {
        if (err) {
            throw err;
        };
        // check if tweet(s) exists
        if (result.length == 0) {
            return res.status(404).json('Tweet not found');
        }
        else
            return res.status(200).json(result);
    });

}

const deleteTweet = (req, res, con) => {

    const { tweet_id, user_id } = req.body;

    if (!tweet_id || !user_id) {
        return res.status(400).json('incorrect form submission');
    }

    // make check if user exists and has premissions to delete

    let sql_delete_tweet = mysql.format('DELETE FROM tweets WHERE id = ?', [tweet_id]);

    con.query(sql_delete_tweet, function (err, result) {
        if (err) {
            throw err;
        };
        // check if tweet exists and query returns only one result
        if (result.affectedRows == 0) {
            return res.status(404).json('Tweet not found');
        }
        else
            return res.status(200).json('Tweet Deleted');
    });
}


module.exports = {
    create: create,
    update: update,
    read: read,
    deleteTweet: deleteTweet
};