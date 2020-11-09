# leapGrad-test

To execute the program:

- Install node and mysql on your machine
- Run npm install to get all the node modules
- Update mysql localhost username and password in .env
- Run node ./db/db_setup.js to create database and tables (should use a migration system)
- Run npm start
- Make requests to localhost:3000/

## Register

- Make requests to localhost:3000/register
- pass in username, email, password in req.body

## Register

- Make requests to localhost:3000/signin
- pass in email, password in req.body

## Message

- To send a message:
- Make requests to localhost:3000/sendMessage
- pass in message to send as message, current user as user_id, user to send message to as to_id in req.body

- To see all messages with a user:
- Make requests to localhost:3000/converstationWithUser
- pass in current user_id, user to see messages with as to_id in req.body

## Tweet

- To create a tweet:
- Make requests to localhost:3000/createtweet
- pass in tweet as message and user id as user_id in req.body

- To update a tweet:
- Make requests to localhost:3000/updatetweet
- pass in updated tweet as message, user id as user_id, and tweet id as tweet_id in req.body

- To get 5 or less of a user's tweet(s):
- Make requests to localhost:3000/readtweet
- pass in user id as user_id in req.body

- To delete a tweet:
- Make requests to localhost:3000/deletetweet
- pass in tweet id as tweet_id and user id as user_id in req.body

## Test

- To test first create a user in database using post req (user 1 is needed for tweet tests).
- Tests are not too extensive because it took me awhile to get them up and running due to issues with sql library and async the queries
- I would have a test database and seed it to avoid such issues in the future
- I would create more tests in the future to rest all functionality of routes (tweet.test.js has two through tests)
- To execute test run: run npm test

chat with other users tests would include:

- no message or missing user ids
- user exists function testing 400 and 200
- 400 status and 200 status for getting converstation with a user
- no converstation with user exists
- 200 send message to user

- would need to create and delete users and converstation in beforeeach and aftereach. Better long tun to have test db which is seeded

### Notes:

- Cors library only added incase you have a front-end to test it against instead of postman.
- Ideally for testing there would be a different test_db and seperated using env variables for testing
- setup created_at, updated_at, deleted_at datetime
