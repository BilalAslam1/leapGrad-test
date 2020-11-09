require('dotenv').config()
const express = require('express');
const cors = require('cors');
const api = require('./routes/routeapi');
const app = express();

// routing setup
app.use('/', api);

app.use(cors())

module.exports = {
    app: app
}