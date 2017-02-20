const RadioStream = require('../models/radioStream');
const radio_list = require('../radio_list');

class StreamPool {

    constructor() {
        this.streams = {};
        this.loadStreams();
    }

    getRadio(radio_id) {
        //Make sure we get a fresh list
        this.loadStreams();
        return this.isStreamLoaded(radio_id) ? this.streams[radio_id] : null;
    }

    loadStreams() {
        //Go through all radios in list
        for (let radio_id in radio_list) {
            if (radio_list.hasOwnProperty(radio_id)) {
                if (!this.streams[radio_id]) {
                    this.streams[radio_id] = new RadioStream(radio_id);
                }
            }
        }
    }

    getRadios() {
        return this.streams;
    }

    isStreamLoaded(radio_id) {
        return !!this.streams[radio_id];
    }

}

//Singleton
module.exports = new StreamPool();