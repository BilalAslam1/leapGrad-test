const app = require("../server");
const con = require('../db/dbconnect');
const request = require('supertest');
const mysql = require('mysql');
let created_tweet_id;

beforeEach(async (done) => {

    // Create user to test and use it's ID

    var sql = "DELETE FROM tweets WHERE tweet = 'testuser' AND user_id = 1";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    var sql_insert_tweet = mysql.format("INSERT INTO tweets (tweet, user_id ) VALUES ('secrettest',1)");
    con.query(sql_insert_tweet, function (err, result) {
        if (err) throw err;
        // For update request to know which tweet to update
        created_tweet_id = result.insertedId;
    });

    done();
})

afterEach(async () => {
    var sql = "DELETE FROM tweets WHERE tweet = 'secrettest' AND user_id = 1";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
})

describe('Post Create Tweet', () => {
    it('should create a new tweet', async () => {
        const res = await request(app)
            .post('/createtweet')
            .set('Authorization', 'jwt_token')
            .send({
                message: 'testuser',
                user_id: 1
            })
        expect(res.status).toEqual(200)
    })
})

describe('Get Read Tweets', () => {
    it('should read user tweets', async () => {
        const res = await request(app)
            .get('/readtweet')
            .set('Authorization', 'jwt_token')
            .send({
                user_id: 1
            })
        expect(res.status).toEqual(200)
    })
})

// Create tests to test 404 responses for create and read
// Create tests to test 200 and 400 responses for update and delete

