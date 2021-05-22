const express = require('express');
const db = require('./models/dbModels');
const app = express();
const yelpSearchAPI = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=${category}&term=restaurants&radius=2000&limit=5`;
const yelpDetailsAPI = 'https://api.yelp.com/v3/businesses/{id}';
const key = 'FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx';
const searchControllers = {};

const { category, location, gmail, id } = req.body;


//post request to get user IDs from Yelp API
searchControllers.sendUserSearch = (req,res,next) => {
    fetch(yelpSearchAPI, {
      params: {
      location: 'Lake Forest',
      category: 'Sushi',
      limit: 5,
    },
      headers: {
        Authorization: `Bearer ${key}`,
    }
  })
  .then((data) => {
    const { businesses } = data;
    const results = businesses.map(obj => obj.id)
    next()
  })
};


// searchControllers.sendID



// yelp query picks up ids from the list of results:
// for loop to go through all the IDs
// list them out in the front end using the for loop
//

//Client ID
//TGFWJiF1cChXSQp_usubUQ

//API Key
//FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx