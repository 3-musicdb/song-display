const fs = require("fs");
const path = require('path');
const csvFile = path.resolve(__dirname, "musicdb.csv");
// const csvFile = path.resolve(__dirname, "musicdbNowaveform.csv");
const csv = require('csv-parser');
const parse = require("csv-parse");
const faker = require('faker');
const Promise = require('bluebird');
const Uuid = require('cassandra-driver').types.Uuid;

const waveform = path.resolve(__dirname, "waveForm.csv");

// let songData = [];
const songComments = [];


generateSongComments();



/*
    id INT,
    song_name VARCHAR,
    artist_name VARCHAR,
    upload_time BIGINT,
    tag VARCHAR,
    song_art_url VARCHAR,
    song_data_url VARCHAR,
    album_art VARCHAR,
    background_light VARCHAR,
    background_dark VARCHAR,
    waveform_data BLOB,
    song_duration INT,
    commentId uuid,
    comment_user_name VARCHAR,
    comment_time_stamp INT,
    comment VARCHAR,
*/

const processData = (err, data) => {
  if (err) {
    console.log(`An error was encountered: ${err}`);
    return;
  }

  const writeUsers = fs.createWriteStream('cassandraData.csv');
  writeUsers.write('id|song_name|artist_name|upload_time|tag|album_art|song_data_url|background_light|background_dark|waveform_data|song_duration|comment_user_name|comment_time_stamp|comment|commentId\n', 'utf8');

  //numComments, numSongs
  data.shift();
  let numSongs = 10000000;
  let numComments = 150000000;

  const start = Date.now();
  writeTenMillionSongs(writeUsers, 'utf-8', data, numSongs, () => {
    writeThreeHundredMillionComments(writeUsers, 'utf-8', numComments, numSongs, () => {
      writeUsers.end();
      const end = Date.now();
      console.log('total time: ' + (end - start));
    })
  });
}


// const processJson = (err, data) => {
//   for (let i = 0; i < data.length; i++) {
//     if (err) {
//       console.log(`An error was encountered: ${err}`);
//       return;
//     }
//     let fileName = 'waveform-' + (i + 1) + '.json';
//     const writeUsers = fs.createWriteStream(fileName);
//     writeUsers.write(data[i][8], 'utf8', () => writeUsers.end());
//   }
// }

fs.createReadStream(csvFile)
  .pipe(parse({ delimiter: ',' }, processData));


function getRndBias(min, max, bias, influence) {
  var rnd = Math.random() * (max - min) + min,   // random in range
      mix = Math.random() * influence;           // random mixer
  return Math.trunc(rnd * (1 - mix) + bias * mix); // mix full range and bias
}

function generateSongComments() {
  for (let i = 0; i < 30; i++) {
    songComments.push([faker.name.findName(),getRandomInt(360), faker.lorem.sentence()]);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// function getSkewedRandomInt(max) {
//   return Math.floor(Math.pow(Math.random(), 4) * (max - 1)) + 1;
// }

function writeTenMillionSongs(writer, encoding, songData, numSongs, callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i++;
      let data = '' + i + '|';

      if(songData[i % 96]) {
        for (let j = 0; j < songData[i % 96].length; j++) {
          if(Number(songData[i % 96][j])) {
            data += songData[i % 96][j] + '|';
          } else {
            data += '"' + songData[i % 96][j] + '"|'; 
          }
        }
        let uuid = Uuid.random();
        data += '|||' + uuid + '\n';
      }

      if (i === numSongs) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < numSongs && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }               
  }
  write();
}

function writeThreeHundredMillionComments(writer, encoding, numComments, numSongs, callback) {
  let i = 0;
  let bias = Math.floor(numSongs * 0.80);
  function write() {
    let ok = true;
    do {
      i++;
      let data = '';

      let user_name = faker.name.findName(); 
      let time_stamp = getRandomInt(360); 
      let comment = faker.lorem.sentences(getRndBias(1, 5, 1, 1).toFixed(0));
      let songId = getRndBias(1, numSongs, bias, .90);
      let uuid = Uuid.random();
      data += songId + '|||||||||||' + '"' + user_name + '"|' + '"' + time_stamp + '"|' + '"' + comment + '"|' + uuid + '\n';

      if (i === numComments) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < numComments && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }               
  }
  write();
}