const Logger = require('../logger');
const StreamPool = require('./streamPool');
const ErrorHandler = require('./ErrorHandler');

const FileRecording = require('../models/fileRecording');

const Helper = {};

Helper.getRadios = function() {
    return StreamPool.getRadios()
        .then( radios => radios.map(radio => radio.toJSON()))
        .catch( err => ErrorHandler.catchLogError(err) );
};

Helper.getRadioInfo = function(radio_id) {
    let Radio = StreamPool.getRadio(radio_id);
    return Radio ? Radio.toJSON() : null;
};

Helper.testRadioStream = function(radio_id) {
    let Radio = StreamPool.getRadio(radio_id);
    if (!Radio) {
        return new Promise( (r, reject) => reject('Radio not found'));
    }

    return Radio.Stream.testStream()
        .then( result => result)
        .catch( err => ErrorHandler.catchLogError(err) );
};

Helper.recordAllOneHour = function(callback) {
    let Radios = StreamPool.streams;
    Radios.forEach( Radio => {
        Radio.Stream.start1HourRecording();
    });
    callback(true);
};

Helper.recordAllTwoHours = function(callback) {
    let Radios = StreamPool.streams;
    Radios.forEach( Radio => {
        Radio.Stream.start2HourRecording();
    });
    callback(true);
};

Helper.recordOneHour = function(radio_id) {
    let Radio = StreamPool.getRadio(radio_id);

    return Helper.recordRadio(Radio, 1)
        .catch( err => ErrorHandler.catchError(err) );
};

Helper.recordRadio = function(Radio, hours) {
    if (Radio.is_recording) {
        return new Promise( (resolve) => resolve('Already recording') );
    }

    return Radio.Stream.testStream()
        .then( () => {
            if (hours == 1) {
                Radio.Stream.start1HourRecording();
            } else if (hours == 2) {
                Radio.Stream.start2HourRecording();
            }
            return true;
        }).catch( err => ErrorHandler.catchLogError(err) );

};

Helper.stopRecording = function(radio_id) {
    let Radio = StreamPool.getRadio(radio_id);

    Radio.Stream.stopStream();
    return true;
};

Helper.reloadRadios = function() {
    StreamPool.loadStreams();
};


module.exports = Helper;