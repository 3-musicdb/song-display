

const Promise = require('bluebird');
const { Client } = require('pg');

client = new Client({
  user: 'craig',
  host: 'localhost',
  database: 'songdisplay',
  password: 'password1!',
  port: 5432,
})
client.connect();

seedPostgres();
function seedPostgres() {

    const start = Date.now();
    console.log('SEEDING USERS NOW\n');
    return new Promise((resolve, reject) => {
      client.query("COPY users (username) from '/Users/cgzlaptop/Documents/HackReactor/song-display/songDisplayComponent/postgresUsers.csv' delimiter '|' CSV HEADER;", (err, res) => {
        if(err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    })
    .then((res) => {
      console.log('SEEDING ARTISTS NOW\n');
      return new Promise((resolve, reject) => {
        client.query("COPY artists (artist_name) from '/Users/cgzlaptop/Documents/HackReactor/song-display/songDisplayComponent/postgresArtists.csv' delimiter '|' CSV HEADER;", (err, res) => {
          if(err) {
            reject(err);
          } else {
            resolve(res);
          }
        })
      })
    })
    .then((res) => {
      console.log('SEEDING SONGS NOW\n');
      return new Promise((resolve, reject) => {
        client.query("COPY songs (song_name, artist_id, upload_time, tag, album_art, song_data_url, background_light, background_dark, waveform_data, song_duration) from '/Users/cgzlaptop/Documents/HackReactor/song-display/songDisplayComponent/postgresSongs.csv' delimiter '|' CSV HEADER;", (err, res) => {
          if(err) {
            reject(err);
          } else {
            resolve(res);
          }
        })
      })
    })
    .then((res) => {
      console.log('SEEDING COMMENTS NOW\n');
      return new Promise((resolve, reject) => {
        client.query("COPY comments (song_id, userid, time_stamp, comment) from '/Users/cgzlaptop/Documents/HackReactor/song-display/songDisplayComponent/postgresComments.csv' delimiter '|' CSV HEADER;", (err, res) => {
          if(err) {
            reject(err);
          } else {
            resolve(res);
          }
        })
      })
    })
    .then((res) => {
      const end = Date.now();
      console.log('total time: ' + (end - start));
      client.end();
    })
    .catch((err) => console.log(err));
}