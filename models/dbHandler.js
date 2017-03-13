'use strict';

const mysql = require('mysql');
const config = require('../local_config')['MYSQL'];

class DBHandler {
    constructor() {
        this.dbpool = mysql.createPool(config);
    }

    getHandle() {
        return new Promise( (resolve, reject) => {
            this.dbpool.getConnection( (err, handle) => {
                err ? reject(err) : resolve(handle);
            })
        });
    }

    query(sql, params = null) {
        return new Promise( (resolve, reject) => {
            this.getHandle()
                .then( conn => conn.query(sql, params, (err, results) => err ? reject(err) : resolve(results) ))
                .catch( err => reject(err) );
        });
    }

}

module.exports = new DBHandler();