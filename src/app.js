const express = require('express');
const healthRoute = require('./routes/health.route')
const userRoute = require('./routes/user.route')

const app = express();

// Middleware to parse JSON
app.use(express.json());

//health route 
app.use('/', healthRoute);

//user route
app.use('/', userRoute);

module.exports = app;
