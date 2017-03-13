'use strict';

const DBHandle = require('./dbHandler');
const RadioStream = require('./radioStream');

class Radio {

    constructor(radio_id, name, urlstream = null) {
        this.radio_id = radio_id;
        this.name = name;
        this.urlstream = urlstream;


        this.Stream = new RadioStream(name, urlstream);
    }

    toJSON() {
        return {
            radio_id: this.radio_id,
            name: this.name,
            stream: this.urlstream,
            is_recording: this.Stream.is_recording,
            recording_data: null

        }
    }


}

module.exports = Radio;