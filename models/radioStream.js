const request = require('request');
const Logger = require('../logger');
const FileRecording = require('./fileRecording');


class RadioStream {
    constructor(radio_name, url) {
        this.name = radio_name;
        this.streamUrl = url;
        this.fileRecording = null;
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
        setTimeout( () => {
            this.is_recording = false;
            this.fileRecording.FTP_File()
                .then(() => {
                    this.streamRequest.abort();
                }).catch( err => {
                    this.streamRequest.abort();
                });
        }, timeout);
    }

    stopStream() {
        if (this.is_recording) {
            this.is_recording = false;
            this.fileRecording.FTP_File()
                .then(() => {
                    this.streamRequest.abort();
                }).catch( err => {
                this.streamRequest.abort();
            });
        }
    }

    testStream() {
        const req_params = {method: 'GET', uri: this.streamUrl};

        return new Promise((resolve, reject) => {
            if (!this.streamUrl) {
                reject('This radio does not have a stream URL');
                return false;
            }
            this.streamRequest = request(req_params, (err, response) => {
                if (err || response.statusCode != 200) {
                    reject('Could not contact URL Stream');
                    return false;
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