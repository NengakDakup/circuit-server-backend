const express = require('express');
const router = express.Router();

// Load User Model
const User = require('../../models/User');
// Load State Model
const State = require('../../models/State');

// @route   GET api/notificatio/test
// @desc    Tests Notification route
// @access  public
router.get('/test', (req, res) => res.json({msg: 'overview Works!'}));


module.exports = router;