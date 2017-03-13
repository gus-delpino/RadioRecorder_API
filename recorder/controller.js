const radio_list = require('../radio_list');
const Helper = require('./helper');

function validateRadioId(radio_id) {
    return !!radio_id;
}

module.exports = {
    getRadios : (req, res) => {
        Helper.getRadios()
            .then( radios => res.json(radios))
            .catch( err => res.send(`Error: ${err}`) );
    },

    getRadioInfo : (req, res) => {
        if (!validateRadioId(req.query.radio_id)) {
            res.send('Radio not found');
            return false;
        }
        res.json(Helper.getRadioInfo(req.query.radio_id));
    },

    testRadioStream: (req, res) => {
        if (!validateRadioId(req.query.radio_id)) {
            res.send('No radio ID');
            return false;
        }
        Helper.testRadioStream(req.query.radio_id)
            .then(result => {
                let res_msg = result ? 'Stream is working' : 'Stream NOT working';
                res.send(res_msg);
            }).catch( err => res.send(`Error: ${err}`) );
    },

    recordOneHour: (req, res) => {
        if (!validateRadioId(req.query.radio_id)) {
            res.send('No radio ID');
            return false;
        }

        Helper.recordOneHour(req.query.radio_id)
            .then( () =>  res.send('Recording') )
            .catch( err => res.send('Error: ' + err) );
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