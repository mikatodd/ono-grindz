const express = require('express');
const db = require('../models/dbModels');
const app = express();

// read up on the yelp-fusion npm package - necessary to use yelp.search and yelp.business in order to access API since localhost cannot make requests to Yelp API
const yelp = require('yelp-fusion');

// For security purposes, you should keep your API keys, usernames, and passwords in a separate file and add them to your .gitignore. Github and Google are automatically alerted when a private API key is exposed on a public repo
// Simply create a security folder in the root director, and create a key.js file which will module.export the api keys, passwords, etc.
const API_KEY = require('../../security/key')
const client = yelp.client(API_KEY.key);

const searchControllers = {};

// helper functions for the Promise.all 
const functionWithPromise = item => {
  return Promise.resolve(item)
}

const anAsyncFunction = async item => {
  return functionWithPromise(item)
}

//get request to Yelp API for business IDs
searchControllers.sendUserSearch = (req, res, next) => {
  let { location, categories } = req.body;
  location = location.toLowerCase();
  categories = categories.toLowerCase();
  client.search({
    term: 'restaurants',
    location: location,
    categories: categories,
    limit: 6,
  })
  .then((data) => {
    return JSON.parse(data.body);
  })
  .then((data)=>{
    const { businesses } = data;
    Promise.all(businesses.map(obj => anAsyncFunction(obj.id)))
    .then((results) => {
      res.locals.ids = results
      return next()
    }
// invoking the next callback function
    )
    .catch(err => {
      return next('Error: error in searchControllers.sendUserSearch')
    })
  })
}

// https://javascript.info/promise-api#:~:text=..%5D)%3B-,Promise.,their%20results%20becomes%20its%20result
// Promise.all wraps around an array; necessary to pass the full results of the map callback 
searchControllers.sendID = (req, res, next) => {
   Promise.all(res.locals.ids.map(id => anAsyncFunction(client.business(id))))
    .then((data) => {
      const obj = {};
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

module.exports = searchControllers