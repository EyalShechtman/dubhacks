const express = require('express');
const app = express();
const port = 4000;
const { jwtCheck } = require('./middleware/checkAuth');


app.get('/helloworld', (req, res) => {
  res.send('Hello, World!');
});

app.use(jwtCheck);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

