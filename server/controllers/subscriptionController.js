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
    const { name, image_url, url, display_phone, hours} = details[restaurant];
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
      from: 'contact.onogainz@gmail.com',
      to: customerEmail,
      subject: `Ono-Gainz: ${name} is closing soon (${end})!`,
      html: (`<div><h1>${name} is closing in 1 hour!!</h1><h2>Get your gainz before it\'s too late!</h2><p>${address1}, ${city}</p><p>${display_phone}</p><p>${schedule[0]} - ${schedule[1]}</p></div>`)
    }

    let hrs = hours[0].open[day].end.substring(0, 2);
    const mins = hours[0].open[day].end.substring(2, 4);

    // subtract 1 from hours, because we want to notify client 1 hour before close
    if (hrs !== "00"){
      hrs = (parseInt(hrs) - 1).toString().padStart(2, '0');
    }
    else{
      hrs = '23';
    }
    console.log(hrs);
    // console.log(`00 ${mins} ${hrs} * * *`)
    // Cron syntax
    // '*     *     *     *     *     *'
    // secs  mins  hrs  days  month  dayofweek(sun-sat, 0 - 6)
    const job = new CronJob(`00 ${mins} ${hrs} * * *`, () => {
      transporter.sendMail(mailOptions)
        .then((info) => {
          console.log(info);
        })
        .catch((error) => {
          console.log(error);
        });
      });
      // job.start();
      console.log(`Email ${restaurant} sent for ${name}`)
  }
  return next();
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
};
module.exports = subscriptionController;