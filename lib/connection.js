'use strict';

const mongoose = require('mongoose'),
    dbSettings = require('../local_config').MONGO,
    radioSchema = require('../models/radioSchema'),
    streamPool = require('../recorder/streamPool'),
    ErrorHandler = require('./ErrorHandler');

const connectionString = `mongodb://${dbSettings.host}:${dbSettings.port}/radiodata`;

const Connection = {
    connect: function() {
        return new Promise((resolve, reject) => {
            mongoose.connect(connectionString, err => {
                if (err) {
                    reject(`Could not connect to MongoDB: ${err}`);
                }
                console.log(`Connected to MongoDB`);
                resolve();
            });
        })
    },
    loadModels: function() {
        mongoose.model('Radio', radioSchema, 'radio');
        console.log('Loading radio list...');

        return streamPool.loadStreams();
    },
    init: function() {
        return new Promise( (resolve, reject) => {
            this.connect()
                .then( () => this.loadModels() )
                .then( radios => {
                    console.log(`Radios loaded.`);
                    resolve(radios);
                })
                .catch( err => reject(err) );
        })
    }
};

//Close connection when process ends
process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log('Mongo connection ended');
        process.exit(0);
    });
});

module.exports = Object.create(Connection);

