'use strict';

const express = require('express'),
    router = express.Router();
const ctrl = require('../recorder/controller');

//Endpoints
router.get('/health', (req, res) => {
    res.send('Hi');
});

router.get('/getRadios', ctrl.getRadios);
router.get('/getRadioInfo', ctrl.getRadioInfo);
router.get('/testRadioStream', ctrl.testRadioStream);
router.get('/recordOneHour', ctrl.recordOneHour);
router.get('/stopRecording', ctrl.stopRecording);
router.get('/recordAllOneHour', ctrl.recordAllOneHour);
router.get('/recordAllTwoHours', ctrl.recordAllTwoHours);

module.exports = router;


