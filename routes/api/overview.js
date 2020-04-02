const express = require('express');
const router = express.Router();

// Load User Model
const User = require('../../models/User');
// Load State Model
const State = require('../../models/State');

// @route   GET api/overview/test
// @desc    Tests users route
// @access  public
router.get('/test', (req, res) => res.json({msg: 'overview Works!'}));

// @route   GET api/overview/switch-source
// @desc    Switch the active source
// @access  public
router.post('/switch-source', (req, res) => {
    // Get the source that should be switched to

    const { source } = req.body;

    // const state = new State({
    //     activeSource: source,
    //     AFIKPO: true,
    //     AMAZIRI: true,
    //     OZZIA: false,
    //     ENOHIA: true,
    //     UNWANA: false
    // });

    // state.save()
    //     .then(state => res.json(state))
    // check if request is from admin

    // send the request to the m.controller

    // recieve a response and update the database
    State.find().limit(1).sort({$natural: -1})
        .then(state => {
            let oldState = state[0];
            oldState.activeSource = source;
            const { activeSource, power, device, AFIKPO, AMAZIRI, OZZIA, ENOHIA, UNWANA } = oldState;
            const newState = new State({
                activeSource,
                power,
                device,
                AFIKPO, 
                AMAZIRI, 
                OZZIA, 
                ENOHIA, 
                UNWANA

            });
            
            
            newState.save()
                .then(state => res.json(state));
        })
});

// @route   GET api/overview/control-community
// @desc    Turn ON / OFF a Community
// @access  public
router.post('/control-community', (req, res) => {
    const {action, community} = req.body;
    
    State.find().limit(1).sort({$natural: -1})
        .then(state => {
            let oldState = state[0];
            const { activeSource, power, device, AFIKPO, AMAZIRI, OZZIA, ENOHIA, UNWANA } = oldState;
            const newState = new State({
                activeSource,
                power,
                device,
                AFIKPO,
                AMAZIRI,
                OZZIA,
                ENOHIA,
                UNWANA,
                [community]: action,
            });

            newState.save()
                .then(state => res.json(state));
        })
})

// @route   GET api/overview/control-power
// @desc    Turn ON / OFF the whole grid
// @access  public
router.post('/control-power', (req, res) => {
    const {action} = req.body;
    
    State.find().limit(1).sort({$natural: -1})
        .then(state => {

            let oldState = state[0];

            const { activeSource, power, device, AFIKPO, AMAZIRI, OZZIA, ENOHIA, UNWANA } = oldState;
            const newState = new State({
                activeSource,
                power: action,
                device,
                AFIKPO,
                AMAZIRI,
                OZZIA,
                ENOHIA,
                UNWANA,
            });
            
            newState.save()
                .then(state => res.json(state));
        })
})

// @route   GET api/overview/control-device
// @desc    Turn ON / OFF the whole device energy usage 
// @access  public
router.post('/control-device', (req, res) => {
    const {action} = req.body;
    
    State.find().limit(1).sort({$natural: -1})
        .then(state => {
            
            let oldState = state[0];

            const { activeSource, power, device, AFIKPO, AMAZIRI, OZZIA, ENOHIA, UNWANA } = oldState;
            const newState = new State({
                activeSource,
                power,
                device: action,
                AFIKPO,
                AMAZIRI,
                OZZIA,
                ENOHIA,
                UNWANA,
            });
            
            newState.save()
                .then(state => res.json(state));
        })
})


module.exports = router;