const fs = require('fs');
const moment = require('moment');
const FTP = require('ftp');
const FTP_settings = require('../local_config')['FTP'];

class FileRecording {
    constructor(radio_name) {
        let timestamp = moment().format('YYYY_MMM_Do_HH_mma');
        this.file_name = `recordings/${radio_name} ${timestamp}.mp3`;
        this.short_name = `${radio_name} ${timestamp}.mp3`;
        this.writableStream = fs.createWriteStream(this.file_name);
        this.FTP = new FTP();
    }

    writeStream(chunks) {
        this.writableStream.write(chunks);
    }

    removeFile() {
        fs.unlink(this.file_name);
    }

    FTP_File() {
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
                this.FTP.put(this.file_name, this.short_name, (err) => {
                    if (err) {
                        reject(`FTP File failed: ${err}`);
                    }
                    this.FTP.end();
                    this.removeFile();
                    resolve(true);
                })
            });

            this.FTP.on('error')
        });



    }
}

module.exports = FileRecording;
