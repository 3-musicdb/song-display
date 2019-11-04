DROP KEYSPACE IF EXISTS songdisplay;

CREATE KEYSPACE songdisplay WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 3};

USE songdisplay;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS songs;

CREATE TABLE users (
    id uuid,
    username VARCHAR,
    PRIMARY KEY (id)
);

CREATE TABLE artists (
    id uuid,
    artist_name VARCHAR,

    PRIMARY KEY (id)
);

CREATE TABLE songs (
    id INT,
    song_name VARCHAR,
    artist_name VARCHAR,
    upload_time VARCHAR,
    tag VARCHAR,
    album_art VARCHAR,
    song_data_url VARCHAR,
    background_light VARCHAR,
    background_dark VARCHAR,
    waveform_data TEXT,
    song_duration INT,
    commentId uuid,
    comment_user_name VARCHAR,
    comment_time_stamp INT,
    comment TEXT,

    PRIMARY KEY (Id, commentId)
);