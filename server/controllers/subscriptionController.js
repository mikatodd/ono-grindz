const express = require('express');

// importing nodemailer module
const nodemailer = require('nodemailer');

// importing separate file where gmail username and password are stored, this file and the entire security folder has been added to .gitignore for security purposes
const gmail = require('../../security/gmail');
const API_KEY = require('../../security/key')
// importing cron npm module. Cron is a tool that allows us to execute something on a schedule
// https://www.npmjs.com/package/cron
// http://crontab.org/ --> for information on Cron schedule syntax
const CronJob = require('cron').CronJob;

// import yelp-fusion api module, create new client which we can use to query the api
const yelp = require('yelp-fusion');
const client = yelp.client(API_KEY.key);
//import db model
const db = require('../models/dbModels');
//inmport moongoose
const mongoose = require('mongoose');

// NodeMailer: initialize a nodemailer Transporter, save into variable transporter. We can use the transporter to send emails.
// Useful documentation
// https://nodemailer.com/about/
// https://www.npmjs.com/package/nodemailer
// function to convert time to readable format
const convertTime = (time) => {
  const hours = (parseInt(time.substring(0, 2)) % 12) === 0 ? 1 : time.substring(0, 2) % 12;
  const minutes = time.substring(2);
  const amOrPm = Math.floor(parseInt(time.substring(0, 2)) / 12) === 1 ? 'PM' : 'AM';
  return (`${hours}:${minutes}${amOrPm}`);
};

// IMPORTANT NOTE: Gmail will restrict the application from sending an email since we are not considered a 'secure application'. To remove this restriction, you will need to do the following:
// 1) navigate to https://myaccount.google.com/
// 2) Go to Security
// 3) Enable 'Less secure app access'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmail.username,
    pass: gmail.password,
  }
});

const subscriptionController = {};


const functionWithPromise = item => {
  return Promise.resolve(item)
}

const anAsyncFunction = async item => {
  return functionWithPromise(item)
}

subscriptionController.getDetails = (req, res, next) => {
  // get all restaurant id keys from the client's request, store them in an array
  const ids = Object.keys(req.body.subscriptions);
  // Promise-all, i.e., wait until all promises are resolved, before moving onto then statement.
  Promise.all(ids.map(id => anAsyncFunction(client.business(id))))
    .then((data) => {
      const obj = {};
      for (let i = 0; i < data.length; i++) {
        obj[i] = data[i].jsonBody
      }
      res.locals.details = obj;
      return next()
    })
    .catch((err) => {
      return next(err);
    })
};


subscriptionController.scheduleEmails = (req, res, next) => {

  // specific restaurant details pulled from getDetails
  const { details } = res.locals;
  const restaurants = Object.keys(details);
  const customerEmail = req.body.email;

  for (const restaurant in restaurants) {
    const { name, image_url, url, display_phone, hours } = details[restaurant];
    const { address1 } = details[restaurant].location;
    const { city } = details[restaurant].location;
    // Determining which date of week it is (e.g., 0 -6)
    const date = new Date();    // new date object
    const day = date.getDay();  // get day in integer 0-6

    let start = hours[0].open[day].start;
    let end = hours[0].open[day].end;

    // convert time to human-readable format
    start = convertTime(start);
    end = convertTime(end);
    const schedule = [start, end];
    // store start and end times in variables

    const mailOptions = {
      from: 'csbigtassels@gmail.com',
      to: customerEmail,
      subject: `Ono-Grindz: ${name} is closing soon (${end})!`,
      html: (`<div><h1>${name} is closing in 1 hour!!</h1><h2>Get your grindz before it\'s too late!</h2><p>${address1}, ${city}</p><p>${display_phone}</p><p>${schedule[0]} - ${schedule[1]}</p></div>`)
    }

    let hrs = hours[0].open[day].end.substring(0, 2);
    const mins = hours[0].open[day].end.substring(2, 4);

    // subtract 1 from hours, because we want to notify client 1 hour before close
    if (hrs !== "00") {
      hrs = (parseInt(hrs) - 1).toString().padStart(2, '0');
    }
    else {
      hrs = '23';
    }
    // console.log(`00 ${mins} ${hrs} * * *`)
    // Cron syntax
    // '*     *     *     *     *     *'
    // secs  mins  hrs  days  month  dayofweek(sun-sat, 0 - 6)
    // 00 00 16 * * *
    // send at 4:00:00PM every day, of every month, every day of the week
    // https://www.npmjs.com/package/cron
    // http://crontab.org/
    // https://crontab.guru/#00_21_1_2
    // https://blog.greenroots.info/send-and-schedule-e-mails-from-a-nodejs-app-ck0l6usms000v4ns1lft6lauw?guid=none&deviceId=eacc572d-a2c6-4f73-b554-d49744af5d13

    // Creates a new cron job with a schedule of hrs and mins (1 hour before restaurant closes)
    const job = new CronJob(`00 ${mins} ${hrs} * * *`, () => {
      transporter.sendMail(mailOptions)
        .then((info) => {
          console.log(info);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    job.start();
    console.log(`Email ${restaurant} scheduled to be sent for ${name}`)
  }
  return next();
};


subscriptionController.createUser = (req,res,next) => {
  const subs = {};
  for(const [key, value] of Object.entries(res.locals.details)){
    subs[value.id] = value;
  }
  // When using findOneAndUpdate()/Delete() need to pass in option useFindAndModify: false
  // https://mongoosejs.com/docs/deprecations.html#findandmodify
  const query = db.User.findOneAndUpdate({email: req.body.email}, { email:req.body.email, subscription: subs},{upsert: true, new: true, useFindAndModify: false});
  
  query.then((data)=>{
    return next();
  })
  .catch((err)=>{
    //pass something into next to go to global error handler
    return next(err)
  })
};

// method to get one user document
subscriptionController.findUser = (req,res,next) => {
  const {email} = req.body
  const query = db.User.find({email: email}, {useFindAndModify: false})
  query.then((data)=>{
    res.locals.user = data;
    return next()
  })
  .catch((err)=>{
    console.log(err)
    return next(err)
  })

};

// Method to delete subscription in user object
subscriptionController.deleteSubscription = (req,res,next) => {
  // "QUICK AND DIRTY" Solution - Jeff Chen

  // Create a find query that filters by email, save the returned document into a variable, this is already done by subscriptionController.findUser

  // Manually go into that saved document, remove the restaurant object to be deleted in JAVASCRIPT

  // Do a findOneAndUpdate and insert the updated object with the deleted restaurant id for the same email.
  return next();
};
module.exports = subscriptionController;