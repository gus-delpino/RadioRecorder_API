'use strict';

const DBHandle = require('./dbHandler');
const Radio = require('./radio');

module.exports = {

    getRadios: () => {
        let sql = `select * from radio 
                   left join radio_stream using(radio_id)`;
        return DBHandle.query(sql)
            .then( rows => rows.map( radio => new Radio(radio.radio_id, radio.name, radio.url)) )
            .catch( err => console.log(err) );
    },

    getStreamForRadio: (radio_id) => {

        DBHandle.query('select * from radio_stream where radio_id = ?', [radio_id])
            .then( rows => rows[0])
            .catch( err => console.log(err) );
    },

    getRadio: (radio_id) => {

        let thisRadio = null,   sql2 = 'select * from radio where radio_id = ?';

            DBHandle.query('select * from radio where radio_id = ?', [radio_id])
                .then(rows => {
                    thisRadio = new Radio(rows[0].radio_id, rows[0].name);
                    return DBHandle.query('select * from radio_stream where radio_id = ?', [radio_id]);
                }).then( rows => {
                    thisRadio.stream = rows[0].url;
                    return thisRadio;
                });
    }


};

class RadioRactory {

    constructor() {

    }

    getStreamforRadio(radio_id) {
        return
    }

    buildRadio(row) {
        return Radio(row);
    }

}