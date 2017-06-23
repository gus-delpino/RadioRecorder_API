'use strict';

const app = require('./lib/app'),
    Logger = require('./logger');
const port = process.env.PORT || require('./local_config').PORT;

app.loadDependencies()
    .then( () => {
        app.start(port)
    })
    .catch( err => {
        console.log(err);
        Logger.log('error', err);
    } );


