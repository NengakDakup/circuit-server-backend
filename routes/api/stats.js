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
});

// @route   GET api/source
// @desc    Get information from the device about the Active Source
// @access  public
router.get('/source', (req, res) => {
    const { source } = req.query;

    if(!source){
        res.json({message: 'Please Fill all fields'})
    }

    res.json({source: source })
});

// @route   GET api/users-status
// @desc    Get information from the device about the Users Status, if on or off
// @access  public
router.get('/users-status', (req, res) => {
    const { user, status } = req.query;

    if(!user || !status){
        res.json({message: 'Please Fill all fields'})
    }

    res.json({user: user, status: status })
});

// @route   GET api/users-status
// @desc    Get information from the device about the Users Status, if on or off
// @access  public
router.get('/source-status', (req, res) => {
    const { source, status } = req.query;

    if(!user || !status){
        res.json({message: 'Please Fill all fields'})
    }

    res.json({user: user, status: status })
});

// @route   GET api/main-status
// @desc    Get information from the device about Central Control Status, if on or off
// @access  public
router.get('/main-status', (req, res) => {
    const { status } = req.query;

    if(!status){
        res.json({message: 'Please Fill all fields'})
    }

    res.json({status: status })
});

module.exports = router;