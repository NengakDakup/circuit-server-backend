const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();

// Load User Model
const User = require('../../models/User');

// @route   GET api/auth/test
// @desc    Tests users route
// @access  public
router.get('/test', (req, res) => res.json({msg: 'users Works!'}));


// @route   GET api/auth/signup
// @desc    Users  Signup route
// @access  public

router.post('/signup', (req, res) => {

    // don't forget to add the send notification function

    const {firstName, lastName, phoneNumber, email, ID, community, password} = req.body;

    if(firstName && lastName && phoneNumber && email && ID && community && password){

        User.findOne({ID: ID})
            .then(user => {
                if(user) return res.status(400).json({error: "User already exists"});

                // SAVE THE NEW USER DETAILS TO AN OBJECT
                const newUser = new User({
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    ID,
                    community,
                    password
                });

                // GENERATE AN ENCRYPTED PASSWORD

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.json({success: "User Successfully Created", user})
                            })
                            .catch(err => console.log(err));
                    });
                });

            })
            .catch(err => res.status(400).json({error: "An unknown error occured"}));
    } else {
        res.status(400).json({error: "Details not complete"});
    }
});

// @route   GET api/auth/Login
// @desc    Users  Login route
// @access  public

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    User.findOne({email: email})
        .then(user => {
            if(!user) return res.status(404).json({error: "User not Found"});

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        return res.json({success: "Successfully Logged In", user});
                    } else {
                        return res.status(400).json({error: 'Incorrect Password'})
                    }
                })
        })
})

module.exports = router;