var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS
});


// Create a Database
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE ??", [process.env.SQL_DB], function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

var con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
});

// Create Tables 
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    var sql_users = "CREATE TABLE users (id INT unsigned not null auto_increment, email VARCHAR(255) not null, username VARCHAR(255) not null, password VARCHAR(255), created_at DATETIME, updated_at DATETIME, deleted_at DATETIME, PRIMARY KEY ( id ), UNIQUE (username), UNIQUE (email))";
    con.query(sql_users, function (err, result) {
        if (err) throw err;
        console.log("Users Table created");
    });

    var sql_tweets = "CREATE TABLE tweets (id INT unsigned not null auto_increment, user_id INT unsigned not null, tweet VARCHAR(255), created_at DATETIME, updated_at DATETIME, deleted_at DATETIME, PRIMARY KEY ( id ), CONSTRAINT FOREIGN KEY (user_id) REFERENCES users(id))";
    con.query(sql_tweets, function (err, result) {
        if (err) throw err;
        console.log("Tweets Table created");
    });

    var sql_messages = "CREATE TABLE messages (id INT unsigned not null auto_increment, from_id INT unsigned not null, to_id INT unsigned not null, message TEXT, created_at DATETIME, deleted_at DATETIME, PRIMARY KEY ( id ), CONSTRAINT FOREIGN KEY (from_id) REFERENCES users(id), FOREIGN KEY (to_id) REFERENCES users(id))";
    con.query(sql_messages, function (err, result) {
        if (err) throw err;
        console.log("Messages Table created");
    });

    var sql_liked_rt = "CREATE TABLE tweets_liked_rt (id INT unsigned not null auto_increment, user_id INT unsigned not null, tweet_id INT unsigned not null, liked BOOLEAN not null, retweeted BOOLEAN not null ,created_at DATETIME, updated_at DATETIME, deleted_at DATETIME, PRIMARY KEY ( id ), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (tweet_id) REFERENCES tweets(id))";
    con.query(sql_liked_rt, function (err, result) {
        if (err) throw err;
        console.log("Tweets liked and retweeted Table created");
    });

});
