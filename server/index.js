const express = require('express');
const app = express();
const port = 4000;
const { jwtCheck, jwtCheckWithCustomError } = require('./middleware/checkAuth');
const db = require('./mongodb/mongoDB');
require('dotenv').config();
const mongoose = require('mongoose');
const accountsRoute = require('./routes/account');
const cors = require('cors');

app.use(cors({
  origin: '*', // Allows requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

const predictionsRoute = require('./routes/perplexity_predict');
const interestUpdateRoutes = require('./routes/interest_update');
const investmentRoutes = require('./routes/investment');
const MONGODB_URI = 'mongodb+srv://lakshey2016:Lakshey123!@romerest.ik1wu.mongodb.net/roamerest?retryWrites=true&w=majority&appName=RomeRest';

// Check if the connection is already established
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB connection successful");
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
    });
} else {
  console.log('MongoDB connection already active');
}

app.use(express.json());

//Middleware for auth information
//app.use(jwtCheckWithCustomError);

app.get('/authorized', (req, res) => {
  res.json({ message: 'Hello from the API' });
});

app.use('/accounts', accountsRoute);
app.use('/perplexity_predict', predictionsRoute);
app.use('/interest_update', interestUpdateRoutes)
app.use('/investment', investmentRoutes)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


