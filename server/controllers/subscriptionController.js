const express = require('express');

// importing nodemailer module
const nodemailer = require('nodemailer');

// importing separate file where gmail username and password are stored, this file and the entire security folder has been added to .gitignore for security purposes
const gmail = require('../../security/gmail');

// importing cron npm module. Cron is a tool that allows us to execute something on a schedule
// https://www.npmjs.com/package/cron
// http://crontab.org/ --> for information on Cron schedule syntax
const CronJob = require('cron').CronJob; 

// import yelp-fusion api module, create new client which we can use to query the api
const yelp = require('yelp-fusion');
const client = yelp.client('FcwzVNzsVl_uQ2QdwZ5bkNZZp2d5zqBOB42D2SAzmtDgCLK0XxeClOD9F4aFyZcn58z0EjAKr8oRCKVje3z2hJwUHKbwUpOAYYoN_wAVYhinn0a0PN0YCX4txlCpYHYx');

// NodeMailer: initialize a nodemailer Transporter, save into variable transporter. We can use the transporter to send emails.

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

  console.log('RESTAURANT IDs: ', ids);
  // Promise-all, i.e., wait until all promises are resolved, before moving onto then statement.
  Promise.all(ids.map(id => anAsyncFunction(client.business(id))))
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
subscriptionController.scheduleEmails = (req, res, next) => {
  
  const { details } = res.locals;
  const restaurants = Object.keys(details);
  const customerEmail = req.body.email;

  for (const restaurant in restaurants) {
    const { name, image_url, url, display_phone, address1, city, hours} = details[restaurant];
    console.log(hours);
  }
  // for (let i = 0; i < 1; i++){
  //   const mailOptions = {
  //     from: 'contact.onogainz@gmail.com',
  //     to: 'joselorenzo.guevara@gmail.com',
  //     subject: `Ono-Gainz Reminder #${i}`,
  //     text: 'Get Your Gainz Before It\'s Too Late!'
  //   }

  //   const job = new CronJob('00 50 18 * * *', () => {
  //     transporter.sendMail(mailOptions)
  //     .then((info) => {
  //       console.log(info);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   });
  //   job.start();
  // }

  return next()
};
module.exports = subscriptionController;