const winston = require('winston');
const moment = require('moment');

winston.add(winston.transports.File, {filename: 'errors.log'});

module.exports = {
    logError: function(err) {
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        winston.error(`${timestamp}: ${err}`);
    }
};

