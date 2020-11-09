var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
});

con.connect(function (err) {
    if (err) throw err;
});

module.exports = con;