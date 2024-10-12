const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const{User}=require('../models')

const port = process.env.PORT || 8080;

const jwtCheck = auth({
    audience: 'http://localhost:4000',
    issuerBaseURL: 'https://dev-w5mc4qlyvvazlxk2.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

module.exports = { jwtCheck };