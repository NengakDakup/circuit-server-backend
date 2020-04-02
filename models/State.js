const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StateSchema = new Schema({
    initiator: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    power: {
        type: Boolean,
        required: true
    },
    device: {
        type: Boolean,
        required: true
    },
    // power State every four hours
    activeSource: {
        type: String,
        required: true
    },
    // Device consumption status
    AFIKPO: {
        type: Boolean,
        required: true
    },
    AMAZIRI: {
        type: Boolean,
        required: true
    },
    OZZIA: {
        type: Boolean,
        required: true
    },
    ENOHIA: {
        type: Boolean,
        required: true
    },
    UNWANA: {
        type: Boolean,
        required: true
    },

})

const State = mongoose.model('state', StateSchema);
module.exports = State;
