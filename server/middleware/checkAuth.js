const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
    audience: 'http://localhost:4000',
    issuerBaseURL: 'https://dev-w5mc4qlyvvazlxk2.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// Custom middleware to handle errors
const jwtCheckWithCustomError = (req, res, next) => {
    jwtCheck(req, res, (err) => {
        if (err) {
            // Customize the error message based on the type of error
            if (err.name === 'UnauthorizedError') {
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'You do not have access to this resource. Please provide a valid token.'
                });
            }
            // For other errors, return a generic error message
            return res.status(500).json({
                error: 'Server Error',
                message: 'An error occurred while processing your request.'
            });
        }
        // If no error, proceed to the next middleware or route handler
        next();
    });
};

module.exports = { jwtCheckWithCustomError, jwtCheck };
