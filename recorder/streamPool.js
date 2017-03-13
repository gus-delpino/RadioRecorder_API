const RadioStream = require('../models/radioStream');
const radio_list = require('../radio_list');
const DB = require('../models/dbHandler');
const Factory = require('../models/factory');
const ErrorHandler = require('./ErrorHandler');

class StreamPool {

    constructor() {
        this.streams = [];
        this.loadStreams();
    }

    getRadio(radio_id) {
        return this.streams.find( x => x.radio_id == radio_id) || null;
    }

    loadStreams() {
        //Go through all radios in list
        return Factory.getRadios()
            .then( radios => {
                //Check if radio is in array
                radios.forEach( radio => {
                    if (!(this.streams.find( x => x.radio_id == radio.radio_id))) {
                        this.streams.push(radio); //Add it
                    }
                });
                //Todo: Check if radios have been removed
                return this.streams;
            }).catch( err => ErrorHandler.catchError(err) );
    }

    getRadios() {
        return this.loadStreams()
            .then( radios => this.streams )
            .catch( err => ErrorHandler.catchError(err) );
    }

}

//Singleton
module.exports = new StreamPool();