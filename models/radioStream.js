const request = require('request');
const Logger = require('../logger');
const FileRecording = require('./fileRecording');
const radioList = require('../radio_list');

class RadioStream {
    constructor(radio_name) {
        if (radioList[radio_name]) {
            this.name = radioList[radio_name]['name'];
            this.streamUrl = radioList[radio_name]['stream'];
            this.fileRecording = null;
        } else {
            Logger.log(`${radio_name} is not a valid name`);
        }
        this.streamRequest = null;
        this.is_recording = false;
    }

    getInfo() {
        return {
            name: this.name,
            stream: this.streamUrl,
            is_recording: this.is_recording
        };
    }

    validRadio() {
        return !!this.name;
    }

    isRecording() {
        return this.is_recording;
    }

    start1HourRecording() {
        //One hour
        let onehour = 60;
        this.saveStream(onehour);
    }

    start2HourRecording() {
        //Two hours
        let twohours = 2 * 60;
        this.saveStream(twohours);
    }

    saveStream(timeout) {
        if (!this.validRadio()) {
            return false;
        }
        if (!timeout) {
            timeout = 5;
        }

        this.is_recording = true;
        this.fileRecording = new FileRecording(this.name);
        const req_params = { method: 'GET', uri: this.streamUrl };

        this.streamRequest = request(req_params, (err, response, body) => {
            if (err || response.statusCode != 200) {
                Logger.log(body);
                this.is_recording = false;
                this.fileRecording.removeFile();
            }

        }).on('data', (dataChunk) => {
            this.fileRecording.writeStream(dataChunk);
        });
        //Convert to minutes
        timeout = timeout * 60 * 1000;
        timeout = 40000;
        setTimeout( () => {
            this.is_recording = false;
            this.streamRequest.abort();
        }, timeout);
    }

    stopStream() {
        if (this.is_recording) {
            this.is_recording = false;
            this.streamRequest.abort();
        }
    }

    testStream() {
        if (!this.validRadio()) {
            return false;
        }
        const req_params = {method: 'GET', uri: this.streamUrl};

        return new Promise((resolve, reject) => {
            this.streamRequest = request(req_params, (err, response) => {
                if (err || response.statusCode != 200) {
                    reject('Could not contact URL Stream');
                }
            }).on('data', (dataChunk) => {
                this.streamRequest.abort();
                let result = this.streamRequest.response.statusCode == 200;
                resolve(result);
                return result;
            });
        });
    }

}

module.exports = RadioStream;