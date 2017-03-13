--create database jacobsji_radiorecorder default character set utf8 collate utf8_general_ci;

drop table if exists radio;
create table radio (
    radio_id int primary key auto_increment,
    name varchar(64) not null
)Engine=InnoDB;

drop table if exists radio_streams;
create table radio_stream (
    radio_stream_id int primary key auto_increment,
    radio_id int not null,
    url varchar(128) not null,

	foreign key fk_radio(radio_id) references radio(radio_id)
)Engine=InnoDB;

drop table if exists radio_recording;
create table radio_recording (
    radio_recording_id int primary key auto_increment,
    radio_id int not null,
    start_time datetime not null,
    end_time datetime not null,
    filename varchar(64) not null,

    foreign key fk_radio(radio_id) references radio(radio_id)

)Engine=InnoDB;