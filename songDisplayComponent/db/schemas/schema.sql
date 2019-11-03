DROP DATABASE IF EXISTS reservations;
CREATE DATABASE reservations;

use reservations

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS comments;


CREATE TABLE users (
  userID int SERIAL,
  username VARCHAR(50),
  PRIMARY KEY (userID)
);

CREATE TABLE artists (
  artistId int SERIAL,
  artist_name VARCHAR(50),
  PRIMARY KEY (artistId)
);

CREATE TABLE songs (
    Id INT,
    song_name VARCHAR(255),
    artist_id INT, //references artistid
    upload_time BIGINT,
    tag VARCHAR(255),
    song_art_url VARCHAR(255),
    song_data_url VARCHAR(255),
    album_art VARCHAR(255),
    background_light VARCHAR(255),
    background_dark VARCHAR(255),
    waveform_data BLOB,
    song_duration INT,

    PRIMARY KEY (Id)

    FOREIGN KEY(artist_id)
      REFERENCES artists(artistId),
);


CREATE TABLE comments (
  commentId int SERIAL,
  song_id int,
  user_id int,
  time_stamp int,
  comment TEXT,

  PRIMARY KEY (commentId),

  FOREIGN KEY(song_id)
    REFERENCES songs(Id),

  FOREIGN KEY (user_id)
    REFERENCES users(userID)
)