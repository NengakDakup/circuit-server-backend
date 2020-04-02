const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ConsumedSchema = new Schema({
    // power consumed every four hours
    powerConsumed: {
        type: Number,
        required: true,
    },
    AFIKPO: {
        type: Number,
        required: true
    },
    AMAZIRI: {
        type: Number,
        required: true
    },
    OZZIA: {
        type: Number,
        required: true
    },
    ENOHIA: {
        type: Number,
        required: true
    },
    UNWANA: {
        type: Number,
        required: true
    },

})

const Consumed = mongoose.model('consumed', ConsumedSchema);
module.exports = Consumed;
