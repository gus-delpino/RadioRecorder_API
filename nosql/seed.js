// Drop previous Database
db = db.getSiblingDB('radiodata');
db.dropDatabase();

db = db.getSiblingDB('radiodata');
db.createCollection('radio');
db.createCollection('recordings');

//Insert seed data
db.radio.insert( [
    {
        'name': 'K-EARTH 101 FM',
        'urlStreams': ['http://18423.live.streamtheworld.com:80/KRTHFMAAC_SC']
    },
    {
        'name': 'KOLA-FM 99.9',
        'urlStreams': ['http://17943.live.streamtheworld.com:80/KOLAFMAAC_SC']
    },
    {
        'name': 'WAVE 94.7FM',
        'urlStreams': ['http://17803.live.streamtheworld.com:80/KTWVFMAAC_SC']
    },
    {
        'name': 'JACK 93.1FM',
        'urlStreams': ['http://19273.live.streamtheworld.com:80/KCBSFMAAC_SC']
    },
]);