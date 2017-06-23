'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const RadioSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    urlStreams: {
        type: [String],
        required: true
    }
});

module.exports = RadioSchema;