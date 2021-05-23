const mongoose = require('mongoose');
const express = require('express'); // import NodeJS express module
const app = express(); // save express property methods to variable app
const port = 3000; // set port to 3000
const path = require('path');
const dbModels = require('./models/dbModels');
const apiRouter = require('./routes/routes');

if (process.env.NODE_ENV === 'production'){
  // statically serve everything in the build folder on the route '/build'
  // https://expressjs.com/en/starter/static-files.html
  // serve index.html on the route '/'
  //NOTE: YOU MUST USE APP.USE() WHEN SERVING STATIC FILES, APP.GET() WILL NOT WORK IN THIS CASE AND THE REQUEST WILL NOT BE HANDLED.
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    console.log('REQUEST MADE to /');
    res.status(200).sendFile(path.join(__dirname, './index.html'));
  });
}

//body parser
app.use(express.json());

//routes
app.use('/api', apiRouter);

// global error handler
app.use('/',(err, req, res, next) => {
  const defaultErr =  {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).send(errorObj.message);
});

// 404 handler
app.use('/', (req, res) => {
  res.status(404).send('the 404 hit');
});

// listening for the port
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});