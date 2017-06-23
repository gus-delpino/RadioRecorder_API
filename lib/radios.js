'use strict';
const mongoose = require('mongoose');

const getRadios = () => new Promise( (resolve, reject) => {
    mongoose.model('Radio').find( (err, result) => {
        if (err) {
            reject(err);
        }
        resolve(result);
    });
});

module.exports = { getRadios };