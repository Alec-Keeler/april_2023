const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Welcome to Express!');
});

app.get(['/stuff', '/other'], (req, res) => {
  res.status(417)
  res.status = 417 // Incorrect
});

app.listen(8000, () => console.log('Listening on port 8000'));
