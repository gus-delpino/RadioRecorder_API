'use strict';

const express = require('express'),
    dbConnection = require('./connection'),
    routes = require('./routes');

const app = {
    server: express(),
    loadDependencies: function() {
        return new Promise( (resolve, reject) => {
            console.log(`Loading Dependencies...`);

            //Connect to MongoDB
            dbConnection.init()
                .then( () => resolve() )
                .catch( err => reject(err) );
        });
    },
    start: function(port) {
        this.server.use('/api', routes)
            .listen( port, () => {
                console.log(`\nServer started. Listening at port ${port}`);
            });
    }
};

module.exports = Object.create(app);
