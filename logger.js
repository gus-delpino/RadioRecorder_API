const winston = require('winston');
const moment = require('moment');

winston.add(winston.transports.File, {filename: 'errors.log'});

module.exports = {
    log: (error) => {
        let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
        winston.log('error', timestamp + ': ' + error);
    }
};

