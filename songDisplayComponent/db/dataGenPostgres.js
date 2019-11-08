const fs = require("fs");
const path = require('path');
const csvFile = path.resolve(__dirname, "musicdb.csv");
// const csvFile = path.resolve(__dirname, "musicdbNowaveform.csv");
const csv = require('csv-parser');
const parse = require("csv-parse");
const faker = require('faker');
const Promise = require('bluebird');
const Uuid = require('cassandra-driver').types.Uuid;


let numSongs = 10000000;
let numComments = 70000000;
let numArtists = 10000;
let numUsers = 10000;
generateArtistUserCsv('postgresArtists.csv', 'artist_name', numArtists);
generateArtistUserCsv('postgresUsers.csv', 'username', numUsers);


generateCommentsCsv('postgresComments.csv', numComments, numSongs);

const processData = (err, data) => {
  if (err) {
    console.log(`An error was encountered: ${err}`);
    return;
  }
  const writeUsers = fs.createWriteStream('postgresSongs.csv');
  writeUsers.write('song_name|artist_id|upload_time|tag|album_art|song_data_url|background_light|background_dark|waveform_data|song_duration\n', 'utf8');

  //numComments, numSongs
  data.shift();


  const start = Date.now();
  writeTenMillionSongs(writeUsers, 'utf-8', data, numSongs, numArtists, () => {
    writeUsers.end();
    const end = Date.now();
    console.log('Songs total time: ' + (end - start));
  });
}

fs.createReadStream(csvFile)
  .pipe(parse({ delimiter: ',' }, processData));



function generateCommentsCsv(filename, numComments, numSongs) {
  let headerString = 'song_id|user_id|time_stamp|comment\n';
  const writeUsers = fs.createWriteStream(filename);
  writeUsers.write(headerString, 'utf8');

  const start = Date.now();
  writeThreeHundredMillionComments(writeUsers, 'utf-8', numComments, numSongs, numUsers, () => {
    writeUsers.end();
    const end = Date.now();
    console.log('Comments total time: ' + (end - start));
  })
}

function getRndBias(min, max, bias, influence) {
  var rnd = Math.random() * (max - min) + min,   // random in range
      mix = Math.random() * influence;           // random mixer
  return Math.trunc(rnd * (1 - mix) + bias * mix); // mix full range and bias
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function generateArtistUserCsv(filename, headerString, numArtistsUsers) {
  const writeUsers = fs.createWriteStream(filename);
  writeUsers.write(headerString + '\n', 'utf8');

  const start = Date.now();
  writeArtistsOrUsers(writeUsers, 'utf-8', numArtistsUsers, () => {
    writeUsers.end();
    const end = Date.now();
    console.log(filename + ' total time: ' + (end - start));
  });
}

function writeArtistsOrUsers(writer, encoding, numArtists, callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i++;
      let data = '';

      let artistUser = faker.name.findName(); 
      data += artistUser + '\n';

      if (i === numArtists) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < numArtists && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }               
  }
  write();
}

function writeTenMillionSongs(writer, encoding, songData, numSongs, numArtists, callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i++;
      let data = '';


      
      if(songData[i % 96]) {
        for (let j = 0; j < songData[i % 96].length; j++) {
          if(j === 1) {
            data += getRandomInt(numArtists) + 1 + '|';
          } else if (j === songData[i % 96].length - 1) {
            if(Number(songData[i % 96][j])) {
              data += songData[i % 96][j];
            } else {
              data += '"' + songData[i % 96][j]; 
            }
          } else {
            if(Number(songData[i % 96][j])) {
              data += songData[i % 96][j] + '|';
            } else {
              data += '"' + songData[i % 96][j] + '"|'; 
            }
          }
        }
        data += '\n';
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

function writeThreeHundredMillionComments(writer, encoding, numComments, numSongs, numUsers, callback) {
  let i = 0;
  let bias = Math.floor(numSongs * 0.80);
  function write() {
    let ok = true;
    do {
      i++;
      let data = '';

      /*
        commentId SERIAL,
        song_id int,
        user_id int,
        time_stamp int,
        comment TEXT,
      */
      let userid = getRandomInt(numUsers) + 1; 
      let time_stamp = getRandomInt(360); 
      let comment = faker.lorem.sentences(getRndBias(1, 5, 1, 1).toFixed(0));
      let songId = getRndBias(1, numSongs, bias, .95);
      data += songId + '|' + '' + userid + '|' + '' + time_stamp + '|' + '"' + comment + '"\n';

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