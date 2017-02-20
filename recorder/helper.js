const Logger = require('../logger');
const radio_list = require('../radio_list');
const StreamPool = require('./streamPool');

const Helper = {};

Helper.getRadios = function() {
    return StreamPool.getRadios();
};

Helper.getRadioInfo = function(radio_id) {
    let Radio = StreamPool.getRadio(radio_id);
    return Radio.getInfo();
};

Helper.testRadioStream = function(radio_id, callback) {
    let Radio = StreamPool.getRadio(radio_id);
    Radio.testStream().then( result => {
        callback(result)
    }).catch( err => {
        Logger.log('error', err);
        callback(err);
    });
};

Helper.recordOneHour = function(radio_id, callback) {
    let Radio = StreamPool.getRadio(radio_id);

    Helper.recordRadio(Radio, 1, (err) => {
        return err ? callback(err) : callback();
    });
};

Helper.recordRadio = function(Radio, hours, callback) {
    if (Radio.isRecording()) {
        callback('Radio is already recording');
        return false;
    }

    Radio.testStream()
        .then( () => {
            if (hours == 1) {
                Radio.start1HourRecording();
            } else if (hours == 2) {
                Radio.start2HourRecording();
            }
            callback();
        })
        .catch( err => {
            Logger.log('error', err);
            callback(err);
        });
    return true;
};

Helper.stopRecording = function(radio_id) {
    let Radio = StreamPool.getRadio(radio_id);

    Radio.stopStream();
    return true;
};

Helper.reloadRadios = function() {
    StreamPool.loadStreams();
};


module.exports = Helper;