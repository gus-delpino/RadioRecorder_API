
insert into radio (name) VALUES
    ('K-EARTH 101 FM'),
    ('KOLA-FM 99.9'),
    ('WAVE 94.7FM'),
    ('JACK 93.1FM');

insert into radio_stream (radio_id, url) VALUES
    ( (select radio_id from radio where name = 'K-EARTH 101 FM') , 'http://18423.live.streamtheworld.com:80/KRTHFMAAC_SC'),
    ( (select radio_id from radio where name = 'KOLA-FM 99.9') , 'http://17943.live.streamtheworld.com:80/KOLAFMAAC_SC'),
    ( (select radio_id from radio where name = 'WAVE 94.7FM') , 'http://17803.live.streamtheworld.com:80/KTWVFMAAC_SC'),
    ( (select radio_id from radio where name = 'JACK 93.1FM') , 'http://19273.live.streamtheworld.com:80/KCBSFMAAC_SC');
