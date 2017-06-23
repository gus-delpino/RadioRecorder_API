'use strict';

const StreamPool = require('./streamPool');
const ErrorHandler = require('../lib/ErrorHandler');

const Helper = {
    getRadios: function() {
        return StreamPool.getRadios()
            .then( radios => radios.map(radio => radio.toJSON()) )
            .catch( err => ErrorHandler.catchLogError(err) );
    },

    getRadioInfo: function(radio_id) {
        return StreamPool.getRadio(radio_id)
            .then( radio => radio )
            .catch( err => ErrorHandler.catchLogError(err) );
    },

    testRadioStream: function(radio_id) {
        return StreamPool.getRadio(radio_id)
            .then( Radio => Radio ? Radio.Stream.testStream() :
                new Promise( (r, reject) => reject('Radio not found')) )
            .then( result => result )
            .catch( err => ErrorHandler.catchLogError(err) );
    },

    recordAllOneHour: function(callback) {
        let Radios = StreamPool.streams;
        Radios.forEach( Radio => {
            Radio.Stream.start1HourRecording();
        });
        callback(true);
    },

    recordAllTwoHours: function(callback) {
        let Radios = StreamPool.streams;
        Radios.forEach( Radio => {
            Radio.Stream.start2HourRecording();
        });
        callback(true);
    },

    recordOneHour: function(radio_id) {
        let Radio = StreamPool.getRadio(radio_id);

        return Helper.recordRadio(Radio, 1)
            .catch( err => ErrorHandler.catchError(err) );
    },

    recordRadio: function(Radio, hours) {
        if (Radio.Stream.isRecording) {
            return new Promise( (resolve) => resolve('Already recording') );
        }

        return Radio.Stream.testStream()
            .then( () => {
                if (hours === 1) {
                    Radio.Stream.start1HourRecording();
                } else if (hours === 2) {
                    Radio.Stream.start2HourRecording();
                }
                return true;
            }).catch( err => ErrorHandler.catchLogError(err) );

    },

    stopRecording: function(radio_id) {
        StreamPool.getRadio(radio_id)
            .then( Radio => Radio.Stream.stopStream() );
        return true;
    }

};


module.exports = Helper;