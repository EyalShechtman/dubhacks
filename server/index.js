const express = require('express');
const app = express();
const port = 4000;
const { jwtCheck } = require('./middleware/checkAuth');
const db = require('./mongodb/mongoDB');
require('dotenv').config();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

