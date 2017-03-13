'use strict';

const Logger = require('../logger');

module.exports = {

    catchLogError: (error) => {
        return this.catchError(error, true);
    },
    catchError: (error, log = false) => {
        return new Promise( (r, reject) => {
            if (log)Logger.log('error', error);
            reject(error);
        });
    }
};