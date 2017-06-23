'use strict';

const RadioStream = require('./radioStream');

const Radio = {
    id: null,
    name: null,
    Stream: null,
    init: function( radioId, name, urlStream = null ) {
        this.id = radioId;
        this.name = name;

        this.Stream = Object.create(RadioStream).init(name, urlStream);
        return this;
    },
    toJSON: function() {
        return {
            id: this.id,
            name: this.name,
            streamData: this.Stream.getInfo()
        }
    }
};

module.exports = Radio;