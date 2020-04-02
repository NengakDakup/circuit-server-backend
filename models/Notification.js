const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotificationSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    current: {
        type: Number,
        required: true,
    },
    voltage: {
        type: Number,
        required: true,
    },
    power: {
        type: Number,
        required: true
    },
    date: {
      type: Date,
      default: Date.now
    }

})

const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification;
