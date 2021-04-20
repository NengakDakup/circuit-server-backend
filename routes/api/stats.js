const express = require('express');
const router = express.Router();

// Load User Model
const User = require('../../models/User');
// Load State Model
const State = require('../../models/State');

// @route   GET api/overview/test
// @desc    Tests Overview route
// @access  public
router.get('/test', (req, res) => res.json({msg: 'overview Works!'}));

// @route   GET api/stats
// @desc    Get information from the device about the currrent and voltage
// @access  public
router.get('/stats', (req, res) => {
    const { current, voltage } = req.query;

    if(!current || !voltage){
        res.json({message: 'Please Fill all fields'})
    }

    res.json({current: current, voltage: voltage })
})


module.exports = router;