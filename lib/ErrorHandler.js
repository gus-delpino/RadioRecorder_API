'use strict';

const Logger = require('../logger');

module.exports = {

    catchLogError: function(error) {
        return this.catchError(error, true);
    },
    catchError: function(error, log = false) {
        return new Promise( (r, reject) => {
            if (log)Logger.logError(error);
            reject(error);
        });
    }
};