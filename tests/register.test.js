const { app } = require('../app');
const register = require('../controllers/register');


it('valid email address', () => {
    expect(register.validateEmail('bird@bird.com')).toBe(true);
});

it('not valid email address', () => {
    expect(register.validateEmail('birdbird.com')).toBe(false);
});

// user with username already exists
// user with that email already exists 
// register user test like post tweet 
