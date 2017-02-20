const fs = require('fs');
const moment = require('moment');

class FileRecording {
    constructor(radio_name) {
        let timestamp = moment().format('YYYY_MMM_Do_HH_mma');
        this.file_name = `recordings/${radio_name} ${timestamp}.mp3`;
        this.writableStream = fs.createWriteStream(this.file_name);
    }

    writeStream(chunks) {
        this.writableStream.write(chunks);
    }

    removeFile() {
        fs.unlink(this.file_name);
    }
}

module.exports = FileRecording;
