const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const PORT = 3000;
const models = require('/Users/fenris/Desktop/Codesmith/Solo/client/models/db.js');
//need to connect controllers

// app.use('/build', express.static(path.join(__dirname, './build')));

// app.use(express.static(path.join(__dirname, '/Solo/build')));
app.use('/build', express.static(path.join(__dirname, './build/bundle.js')))

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, './index.html'));
});


app.use('/',(err, req, res, next) => {
  const defaultErr =  {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(defaultErr, err);
  res.status(errorObj.status).send(errorObj.message);
});


app.use('/', (req, res) => {
  res.status(404).send('the 404 hit');
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;