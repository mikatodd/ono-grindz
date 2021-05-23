const express = require('express');
const db = require('../models/dbModels');
const app = express();
const yelp = require('yelp-fusion');
const client = yelp.client('FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx');
const searchControllers = {};

// const { category, location, gmail, id } = req.body;


//get request to Yelp API for business IDs
searchControllers.sendUserSearch = (req, res, next) => {
  // const { location, category } = req.body
  client.search({
    term: 'restaurants',
    location: 'Lake Forest, CA',
    category: 'Sushi',
    limit: 2,
  })
  .then((data) => {
    return JSON.parse(data.body);
  })
  .then((data)=>{
    const { businesses } = data;
    const results = businesses.map(obj => obj.id)
    res.locals.ids = results;
    next()
  })
  .catch(err => {
    console.log(err, 'error')
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
      for(let i = 0; i < data.length; i++){
        obj[i] = data[i].jsonBody
     }
     //console.log('THIS IS OBJ',obj)
      res.locals.details = obj;
      next()
    })
    .catch((err)=>{
      console.log(err, 'error')
    })
  };

//subscribe


//Client ID
//TGFWJiF1cChXSQp_usubUQ

//API Key
//FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx

module.exports = searchControllers