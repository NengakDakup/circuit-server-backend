const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GeneratedSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    source: {
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

const Generated = mongoose.model('generated', GeneratedSchema);
module.exports = Generated;
