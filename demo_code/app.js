const express = require('express');
const app = express();

// Boilerplate code
app.use(express.json()); // for parsing request body

app.post('/test', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get(['/stuff', '/test'], (req, res) => {
  // console.log(req);
  res.status(417);
  res.send('This is our second route.');
  // res.status = 417 // Incorrect
});

app.get('/things/:id', (req, res) => {
  console.log('params', req.params);
  console.log('query', req.query);
  res.send(req.params.id); // <--
});

app.get('/test', (req, res) => {
  res.send('Welcome to Express!');
});

app.listen(8000, () => console.log('Listening on port 8000'));
