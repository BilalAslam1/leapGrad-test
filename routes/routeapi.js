var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const register = require('../controllers/register');
const signin = require('../controllers/signin');
const tweet = require('../controllers/tweet');
const message = require('../controllers/message');
const auth = require('../middleware/authorization');
const con = require('../db/dbconnect');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json()

router.post('/register', jsonParser, (req, res) => { register.handleRegister(req, res, con, bcrypt) });
router.post('/signin', jsonParser, (req, res) => { signin.signInAuthentication(req, res, con, bcrypt) });

// middleware to access these with jwt token 
router.post('/sendMessage', jsonParser, auth.requireAuth, (req, res) => { message.sendMessage(req, res, con) });
// get whole message chain with a certain user to populate converstaion on front end
router.get('/converstationWithUser', jsonParser, auth.requireAuth, (req, res) => { message.converstationWithUser(req, res, con) });

router.post('/createtweet', jsonParser, auth.requireAuth, (req, res) => { tweet.create(req, res, con) });
router.put('/updatetweet', jsonParser, auth.requireAuth, (req, res) => { tweet.update(req, res, con) });
router.get('/readtweet', jsonParser, auth.requireAuth, (req, res) => { tweet.read(req, res, con) });
router.delete('/deletetweet', jsonParser, auth.requireAuth, (req, res) => { tweet.deleteTweet(req, res, con) });

module.exports = router;