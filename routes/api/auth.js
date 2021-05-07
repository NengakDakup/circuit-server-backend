const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

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

    const {firstName, lastName, phoneNumber, email, ID, community, password, password2} = req.body;

    if(firstName && lastName && phoneNumber && email && ID && community && password && password2){

        User.findOne({ID: ID})
            .then(user => {
                if(user) return res.status(400).json({error: "User already exists"});

                User.findOne({email: email}).then(user => {
                    if(user) return res.status(400).json({error: "Email Already Exists"});

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
                                    res.json({success: "User Successfully Created, Please Contact Admin to Verify Account", user: {...user, password: null}})
                                })
                                .catch(err => console.log(err));
                        });
                    });


                })



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
                        if(user.status === 0) return res.status(400).json({error: "Please Contact Admin To Activate Account"});
                        jwt.sign({...user, password: null}, process.env.JWTKey, {expiresIn: 604800}, (err, token) => {
                            if(err) console.log(err);
                            return res.json({
                                success: 'Successfully Logged In',
                                token: 'Bearer ' + token
                            })
                        });
                        // return res.json({success: "Successfully Logged In", user});
                    } else {
                        return res.status(400).json({error: 'Incorrect Password'})
                    }
                })
        })
})

router.get('/users', (req, res) => {
    User.find({},{password: 0}).then(users => {
        res.json({users: users.reverse()})
    })
});

router.post('/authorize', (req, res) => {
    const {status, email} = req.body;

    let newStatus;

    if(status === 0){
        newStatus = 1;
    } else if(status === 1){
        newStatus = 0;
    } else if(status === 10){
        return res.json({error: 'Admin Authority Cannot be Changed'});
    } else {
        return res.json({error: 'An Unknown Error Occured'});
    }

    User.findOne({email: email}).then(user => {

        if(!user){
            return res.json({error: 'An Unknown Error Occured'});
        } else {
            user.status = newStatus;
            user.save().then(newUSer => {
                return res.json({success: 'User Status Has Been Changed, please Reload for Changes'})
            }).catch(err => {
                return res.json({error: 'An Unknown Error Occured'});
            })
            
        }
    })
})

module.exports = router;