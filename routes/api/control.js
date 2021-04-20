const express = require('express');
const router = express.Router();
const axios = require('axios');

const HOST = '192.19878.398386.45';
const PORT = '80';

// @route   GET api/control/test
// @desc    Tests Control route
// @access  public
router.get('/test', (req, res) => res.json({msg: 'Control Works!'}));

// @route   GET api/control/change-source
// @desc    Sends request to the device to switch the active power source
// @access  public
router.post('/change-source', (req, res) => {
    const {source, status} = req.body;

    //here we need the host address of the device so we can send GET requests to
    axios.get(HOST+PORT, {
        params: {
          source: source,
          status: status
        }
    }).then(res => {
        console.log(res)
    }).catch(err => console.log(err));

})


module.exports = router;