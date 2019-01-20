const users = require('../routes/users');
const authentication = require('../routes/authentication');
const account = require('../routes/account');
const verification = require('../routes/verification');
const errors = require('../middleware/errors');
const express = require('express');

module.exports = (app)=>{
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/login', authentication);
    app.use('/api/account', account);
    app.use('/api/verification', verification);
    app.use(errors);
};