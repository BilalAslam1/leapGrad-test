var express = require('express');
var request = require('supertest');
var app = express();

const register = require('../controllers/signin');



it('no password', () => {
    expect(register.handleSignin({ body: { email: 'john@bird.com', password: '' } }, {}, {}).catch(error => { error })).toMatchObject(Promise.reject());
});

it('no email', () => {
    expect(register.handleSignin({ body: { email: '', password: 'sdfsdf' } }, {}, {}).catch(error => { error })).toMatchObject(Promise.reject());
});


// wrong email or pass 
// Get signin request 200 
