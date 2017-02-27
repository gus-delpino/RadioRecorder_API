const radio_list = require('../radio_list');
const Helper = require('./helper');

function validateRadioId(radio_id) {
    return radio_id && radio_list[radio_id];
}

module.exports = {
    getRadios : (req, res) => {
        Helper.reloadRadios();
        res.json(Helper.getRadios());
    },

    getRadioInfo : (req, res) => {
        if (!validateRadioId(req.query.radio_id)) {
            res.send('Radio not found');
        }
        res.json(Helper.getRadioInfo(req.query.radio_id));
    },

    testRadioStream: (req, res) => {
        if (!validateRadioId(req.query.radio_id)) {
            res.send('No radio ID');
            return false;
        }
        Helper.testRadioStream(req.query.radio_id, (result) => {
            let res_msg = result ? 'Stream is working' : 'Stream NOT working';
            res.send(res_msg);
        })
    },

    recordOneHour: (req, res) => {
        if (!validateRadioId(req.query.radio_id)) {
            res.send('No radio ID');
            return false;
        }

        Helper.recordOneHour(req.query.radio_id, (err) => {
            let res_msg = err ? 'Error: ' + err : 'Recording';
            res.send(res_msg);
        })
    },

    recordAllOneHour: (req, res) => {
        Helper.recordAllOneHour(() => {
            res.send('Done');
        });
    },

    recordAllTwoHours: (req, res) => {
        Helper.recordAllTwoHours(() => {
            res.send('Done');
        });
    },

    stopRecording: (req, res) => {
        if (!validateRadioId(req.query.radio_id)) {
            res.send('No Radio ID');
            return false;
        }

        Helper.stopRecording(req.query.radio_id);
        res.send('Done');
    },

    testFTP: (req, res) => {
        Helper.testFTP();
    }




};