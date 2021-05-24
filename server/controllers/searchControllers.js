const express = require('express');
const db = require('../models/dbModels');
const app = express();
const yelp = require('yelp-fusion');
const API_KEY = require('../../security/key')
const client = yelp.client('FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx');

const searchControllers = {};

//get request to Yelp API for business IDs
searchControllers.sendUserSearch = (req, res, next) => {
  console.log(req.body);
  let { location, categories } = req.body;
  location = location.toLowerCase();
  categories = categories.toLowerCase();
  console.log(req.body);
  client.search({
    term: 'restaurants',
    location: location,
    categories: categories,
    limit: 9,
  })
  .then((data) => {
    // return JSON.parse(data.body);
    return JSON.parse(data.body);
  })
  .then((data)=>{
    const { businesses } = data;
    const results = businesses.map(obj => obj.id)
    res.locals.ids = results;
    console.log(data);
    return next(); // invoking the next callback function
  })
  .catch(err => {
    return next('Error: error in searchControllers.sendUserSearch')
  })

};

const functionWithPromise = item => {
  return Promise.resolve(item)
}

const anAsyncFunction = async item => {
  return functionWithPromise(item)
}

searchControllers.sendID = (req, res, next) => {
   Promise.all(res.locals.ids.map(id => anAsyncFunction(client.business(id))))
    .then((data) => {
      const obj = {};
      console.log('HELLLOOOOO');
      for(let i = 0; i < data.length; i++){
        obj[i] = data[i].jsonBody
     }
      res.locals.details = obj;
      return next()
    })
    .catch((err)=>{
      return next(err);
    })
  };

//subscribe


//Client ID
//TGFWJiF1cChXSQp_usubUQ

//API Key
//FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx

module.exports = searchControllers