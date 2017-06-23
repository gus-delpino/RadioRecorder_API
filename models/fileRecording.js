const fs = require('fs');
const moment = require('moment');
const FTP = require('ftp');
const FTP_settings = require('../local_config')['FTP'];

const FileRecording = {
    fileName: null,
    shortName: null,
    writableStream: null,
    ftp: null,

    init: function(radioName) {
        const timestamp = moment().format('YYYY_MMM_Do_HH_mma');
        this.fileName = `recordings/${radioName} ${timestamp}.mp3`;
        this.shortName = `${radioName} ${timestamp}.mp3`;
        this.writableStream = fs.createWriteStream(this.fileName);
        this.FTP = new FTP();
        return this;
    },
    writeStream: function(chunk) {
        this.writableStream.write(chunk);
    },
    removeFile: function() {
        fs.unlink(this.fileName);
    },
    FTP_File: function() {
        this.FTP.connect({
            host: FTP_settings.host,
            port: FTP_settings.port,
            secure: true,
            secureOptions: {rejectUnauthorized: false},
            user: FTP_settings.username,
            password: FTP_settings.password
        });

        return new Promise( (resolve, reject) => {
            this.FTP.on('ready', () => {
                this.FTP.put(this.fileName, this.shortName, (err) => {
                    if (err) {
                        reject(`FTP File failed: ${err}`);
                    }
                    this.FTP.end();
                    this.removeFile();
                    resolve(true);
                })
            });
            this.FTP.on('error', err => reject(`FTP Failed: ${err}`) );
        });
    }
};

module.exports = FileRecording;
