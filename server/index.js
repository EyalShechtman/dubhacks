const express = require('express');
const app = express();
const port = 4000;
const { jwtCheck, jwtCheckWithCustomError } = require('./middleware/checkAuth');
const db = require('./mongodb/mongoDB');
require('dotenv').config();
const accountsRoute = require('./routes/account');
const predictionsRoute= require('./routes/perplexity_predict')
app.use(express.json());

//Middleware for auth information
//app.use(jwtCheckWithCustomError);

app.get('/authorized', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

app.use('/accounts', accountsRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use('/perplexity_predict',predictionsRoute);


