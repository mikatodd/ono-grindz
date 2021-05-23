const express = require('express');
const searchControllers = require('../controllers/searchControllers');
const router = express.Router();

router.post('/search',
  searchControllers.sendUserSearch,
  searchControllers.sendID,
  (req, res) => {
    const { details } = res.locals;
    return res.status(200).json({ details })
  }
);

//this is what we save in db
router.post('/subscribe')
//will be sending the user all there subs
router.get('/')
//process client unsubscribe
router.delete('/unsubscribe')

module.exports = router;

