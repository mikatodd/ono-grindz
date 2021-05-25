const express = require('express');
const searchControllers = require('../controllers/searchControllers');
const subscriptionController = require('../controllers/subscriptionController');
const router = express.Router();

router.use(express.json());
router.post('/search',
searchControllers.sendUserSearch,
searchControllers.sendID,
(req, res) => {
  const { details } = res.locals;
  return res.status(200).json({ details })
}
);

// client will send a request to '/api/subscribe' after the user has selected their restaurants and clicked the subscribe button. The data received will be either in form of object or array of restaurant IDs
// we will also need to schedule automatic emails to be sent out here for each restaurant using the NodeMailer and Cron node modules

router.use('/subscribe',
  subscriptionController.getDetails,
  subscriptionController.scheduleEmails,
  subscriptionController.createUser,
  (req, res) => {
    res.status(200).json('Subscribed!')
  }
)
// send user all their subs to be displayed in a window
//process client unsubscribe
router.post('/unsubscribe',
  subscriptionController.deleteSubscription,
  (req, res) => {
    res.status(200).send('document deleted')
  }
)

module.exports = router;

