const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send('Welcome to Express!');
});

app.listen(8000, () => console.log('Listening on port 8000'));
