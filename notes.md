# W10 D1

### Definitions
  ##### What is front-end development?
  - Defining how the user requests are sent (i.e. buttons)
  - Frontends Handle responses

  ##### What is back-end development?
  - Define how we handle incoming requests & what to send back
  - Backends handle requests

  ##### What is an `API`?
  - A collection of functions/processes (a.k.a. endpoints) that allows an app to send requests and get back features/data
  - db <> client

  ##### What is a framework?
  - A supporting structure (library) that simplifies certain processes
  - "outline for the thing we want to build"

  ##### What is Express?
  - A backend framework for building APIs


### Steps to Building a Server
  1. Initialize node (`npm init -y`)
      - `-y` to answer yes to all prompts

  2. Install packages
        - express (`npm install express`)
        - nodemon as dev dependency (`npm install -D nodemon`)
          - `-D` to use only in development environment

  3. Create `app.js` file at the same level (root level) as package.json

  4. Import and invoke express package
```js
const express = require('express');
const app = express();
```

  6. Write listen method
```js
// app.listen('port_number', callback)
app.listen(8000, () => console.log('Listening on port 8000'));
```

  7. Set start scripts inside of package.json
```js
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
},
```

  > except start, prefix with run... i.e. `npm run dev`

  8. Build endpoints
```js
// app.method('path', (req, res) => {...something})
app.get('/test', (req, res) => {
  res.send('Welcome to Express!');
});
```

  9. Add boilerplate code
```js
const express = require('express');
const app = express();


app.use(express.json()) // <-- enables parsing of the request body

app.post('/test', (req, res) => {
  res.json(req.body); // This will return JSON object
});

app.listen(8000, () => console.log('Listening on port 8000'));

```

### Different ways to declare paths
```js
// 1. A string
app.get('/hello', cb);

// 2. A string of Regular Expression (a.k.a 'Regex')
app.get('/ab*cd', cb);
// will match abcd, abxcd, abRANDOMcd, ab123cd, and so on

// 3. An array of strings
app.get(['/stuff', '/other'], cb);
```

### Different methods to respond
```js
// 1. Send JSON object, primariy method for our purpose
res.json({"JSON": "object"});

// 2. Send plain text, sometimes
res.send('string');

// 3. Redirect to different endpoint
res.redirect('/users'); // GET /users

// 4. Render a front-end template
res.render('profile');
```

### `res.status()` method
  - Sets a specific status to the response

```js
res.status(417);

res.status = 417; // Common mistake
```

## Middleware*
  - Performs some processing in between routes
  - Topic for tomorrow

### Pro Tip:
  1. express works from top to bottom. The order of our codes matter!
