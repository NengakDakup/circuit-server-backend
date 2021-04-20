const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// Load the routes from the api
// const auth = require('./routes/api/auth');
const stats = require('./routes/api/stats');
// const notification = require('./routes/api/notification')

// Initialize the app
const app = express();


// Enable cors middleware for enabling cross origin requests
app.use(cors());


// Body parser middleware for parsing requests to json formats
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = process.env.localURI;

// Connect to the mongodb
// mongoose.connect(process.env.localURI || db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log(err));

// Load the routes into the application
// app.use('/api/auth', auth);
app.use('/api', stats);
// app.use('/api/notification', notification);

// Select the port for the application
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({status: 'Working'})
})

// Listen on the selected ports for any incoming requests
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})