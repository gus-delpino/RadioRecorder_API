'use strict';

const Radio = require('../models/radio');
const radiosGet = require('../lib/radios');

const StreamPool = {
    streams: [],
    loadStreams: function() {
        return radiosGet.getRadios()
            .then( radios => {
                //Check if radio is already in list
                radios.forEach( radio => {
                    if (!(this.streams.find(x => x._id === radio._id))) {
                        this.streams.push( Object.create(Radio)
                            .init(radio._id, radio.name, radio.urlStreams) );
                    }
                });

                return this.streams;
            })
            .catch( err => err );
    },
    getRadios: function() {
        return this.loadStreams()
            .then( radios => radios )
            .catch( err => err );
    },
    getRadio: function(radio_id) {
        return this.loadStreams()
            .then( radios => radios.find( x => x.id == radio_id ) )
            .catch( err => err );
    },

};

//
// class StreamPool {
//
//     constructor() {
//         this.streams = [];
//         this.loadStreams();
//     }
//
//     getRadio(radio_id) {
//         return this.streams.find( x => x.radio_id == radio_id) || null;
//     }
//
//     loadStreams() {
//         //Go through all radios in list
//         return Factory.getRadios()
//             .then( radios => {
//                 //Check if radio is in array
//                 radios.forEach( radio => {
//                     if (!(this.streams.find( x => x.radio_id == radio.radio_id))) {
//                         this.streams.push(radio); //Add it
//                     }
//                 });
//                 //Todo: Check if radios have been removed
//                 return this.streams;
//             }).catch( err => ErrorHandler.catchError(err) );
//     }
//
//     getRadios() {
//         return this.loadStreams()
//             .then( radios => this.streams )
//             .catch( err => ErrorHandler.catchError(err) );
//     }
//
// }

//Singleton
//module.exports = new StreamPool();
const pool = Object.create(StreamPool);
//pool.loadStreams();
module.exports = pool;