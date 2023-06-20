const express = require('express');
const app = express();

// Boilerplate code
app.use(express.json()); // for parsing request body

// app.use(express.static('assets')) // for servering static files (css, frontend js, etc)
// app.use('/static', express.static('assets')) // for servering static files (css, frontend js, etc)
// assets/css/index.css
// assets/static/css/index.css
app.use('/static', express.static('assets/css')) // for servering static files (css, frontend js, etc)

// app.use((req, res, next) => {
//   console.log('1')
//   console.log(req.path)
//   next()
// })

// app.use('/things', (req, res, next) => {
//   console.log('2')
//   console.log(req.path)
//   next()
// })

// app.use((req, res, next) => {
//   console.log('3')
//   console.log(req.path)
//   next(123)
// })

// app.use((err, req, res, next) => {
//   console.log('4')
//   next(err)
// })

// app.use((err, req, res, next) => {
//   console.log('5')
//   console.log(err)
//   next()
// })
 
const postChecker = (req, res, next) => {
  if (!req.body.test) {
    // return res.send('please provide a test property in your request body')
    const err = new Error('please provide a test property in your request body')
    err.statusCode = 401
    return next(err)
  } 
  next()
}

// app.use(postChecker)

app.post('/test', postChecker, (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
//////////////
app.get(['/stuff', '/test'], (req, res, next) => {
  // console.log(req);
  res.status(417);
  res.send('This is our second route.');
  // next()
  // res.status = 417 // Incorrect
});

app.get('/things/:id', (req, res, next) => {
  console.log('params', req.params);
  console.log('query', req.query);

  if (req.params.id > 10) {
    const err = new Error('The requested thing could not be found')
    err.statusCode = 404
    return next(err)
    // res.status(404)
    // return res.json({
    //   message: 'The requested thing could not be found',
    //   statusCode: 404
    // })
  }
  res.send(req.params.id); // <--
});

app.get('/test', (req, res) => {
  res.send('Welcome to Express!');
});

app.use((req, res, next) => {
  // res.status(404)
  // res.json({
  //   message: 'The requested end point could not be found',
  //   statusCode: 404
  // })
  const err = new Error('The requested end point could not be found')
  err.statusCode = 404
  return next(err)
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode)
  res.json({
    message: err.message || 'Something went wrong',
    statusCode: statusCode,
    stack: err.stack
  })
})



app.listen(8000, () => console.log('Listening on port 8000'));
