'use strict';

const request = require('request');
const Logger = require('../logger');
const FileRecording = require('./fileRecording');

const RadioStream = {
    name: null,
    streamUrl: null,
    fileRecording: null,
    streamRequest: null,
    isRecording: false,

    init: function(name, url) {
        this.name = name;
        this.streamUrl = url;
        return this;
    },

    getInfo: function() {
        return {
            streamUrl: this.streamUrl,
            isRecording: this.isRecording }
    },

    testStream: function() {
        const req_params = { method: 'GET', uri: this.streamUrl[0] };

        return new Promise((resolve, reject) => {
            if (this.streamUrl.length === 0) {
                reject('This radio does not have a stream URL');
            }
            this.streamRequest = request(req_params, (err, response) => {
                if (err || response.statusCode !== 200) {
                    reject('Could not contact URL Stream');
                }
            }).on('data', (dataChunk) => {
                this.streamRequest.abort();
                resolve( this.streamRequest.response.statusCode === 200 );
            });
        });
    },

    start1HourRecording: function() {
        const oneHour = 60;
        this.saveStream(oneHour);
    },
    start2HourRecording: function() {
        let twoHours = 2 * 60;
        this.saveStream(twoHours);
    },
    saveStream: function(timeout) {
        if (!timeout) {
            timeout = 5;
        }

        this.isRecording = true;
        this.fileRecording = Object.create(FileRecording).init(this.name);

        const req_params = { method: 'GET', uri: this.streamUrl };

        this.streamRequest = request(req_params, (err, response, body) => {
            if (err || response.statusCode !== 200) {
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
            this.stopStream();
        }, timeout);
    },

    stopStream: function() {
        if (this.isRecording) {
            this.isRecording = false;
            this.fileRecording.FTP_File()
                .then(() => this.streamRequest.abort() )
                .catch( err => this.streamRequest.abort() );
        }
    }
};

module.exports = RadioStream;