const fs = require("fs");
const path = require('path');
const csvFile = path.resolve(__dirname, "musicdb.csv");
// const csvFile = path.resolve(__dirname, "musicdbNowaveform.csv");
const csv = require('csv-parser');
const parse = require("csv-parse");
const faker = require('faker');
const Promise = require('bluebird');

const waveform = path.resolve(__dirname, "waveForm.csv");

// let songData = [];
const songComments = [];
let commentId = 0;


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

  data.shift();
  writeTenMillionSongs(writeUsers, 'utf-8', data, 300, () => {
    writeThreeHundredMillionComments(writeUsers, 'utf-8', () => {
      writeUsers.end();
    })
  });
}

fs.createReadStream(csvFile)
  .pipe(parse({ delimiter: ',' }, processData));


function generateSongComments() {
  for (let i = 0; i < 30; i++) {
    songComments.push([faker.name.findName(),getRandomInt(360), faker.lorem.sentence()]);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getSkewedRandomInt(max) {
  return Math.floor(Math.pow(Math.random(), 4) * (max - 1)) + 1;
}

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
        data += '|||' + commentId + '\n';
        commentId++;
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

function writeThreeHundredMillionComments(writer, encoding, callback) {
  let i = 0;
  function write() {
    let ok = true;
    do {
      i++;
      let data = '';

      let user_name = faker.name.findName(); 
      let time_stamp = getRandomInt(360); 
      let comment = faker.lorem.sentences(getRandomInt(5));
      let songId = getSkewedRandomInt(200);
      data += songId + '|||||||||||' + '"' + user_name + '"|' + '"' + time_stamp + '"|' + '"' + comment + '"|' + commentId + '\n';
      commentId++;

      if (i === 100) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < 100 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }               
  }
  write();
}

  




// const processWaveform = (err, data) => {
//   if (err) {
//     console.log(`An error was encountered: ${err}`);
//     return;
//   }
//   // console.log(data);

//   // console.log(JSON.parse(data[1]));
//   for (let i = 1; i < data.length; i++) {
//     let waveForm = JSON.parse(data[i])
//     for (let key in waveForm) {
//       for (let j = 0; j < waveForm[key].length; j++) {
//         waveForm[key][j] = Number(waveForm[key][j].toFixed(3));
//         // data[i][key][j] = Number(data[i][key][j].toFixed(3));
//       }
//     }
//     data[i] = JSON.stringify(waveForm);
//   }

//   console.log(data);

//   const writeUsers = fs.createWriteStream('users.csv');
//   writeUsers.write('id,\n', 'utf8');

//   writeTenMillionUsers(writeUsers, 'utf-8',data, () => {
//     writeUsers.end();
//   });
// }

// fs.createReadStream(waveform)
//   .pipe(parse({ delimiter: ',' }, processWaveform));



  // function writeTenMillionUsers(writer, encoding, callback) {
  //   let i = 10000000;
  //   let id = 0;
  //   function write() {
  //     let ok = true;
  //     do {
  //       i -= 1;
  //       id += 1;
  //       const username = faker.internet.userName();
  //       const avatar = faker.image.avatar();
  //       const data = `${id},${username},${avatar}\n`;
  //       if (i === 0) {
  //         writer.write(data, encoding, callback);
  //       } else {
  //         // see if we should continue, or wait
  //         // don't pass the callback, because we're not done yet.
  //         ok = writer.write(data, encoding);
  //       }
  //     } while (i > 0 && ok);
  //     if (i > 0) {
  //       // had to stop early!
  //       // write some more once it drains
  //       writer.once('drain', write);
  //     }               
  //   }
  // write();
  // }

  // writeTenMillionUsers(writeUsers, 'utf-8', () => {
  //   writeUsers.end();
  // });




// function getRndBias(min, max, bias, influence) {
//     var rnd = Math.random() * (max - min) + min,   // random in range
//         mix = Math.random() * influence;           // random mixer
//     return rnd * (1 - mix) + bias * mix;           // mix full range and bias
//  }
//  var a = "";
//  for(var i = 0; i < 300000000; i++){
//  a = a.concat(",").concat(getRndBias(1, 500, 8000000, .90).toFixed(0));
//  }
//  console.log(a);

// songId = getRndBias(1, 500, 8000000, .90);

//comments
//getRndBias(1, 5, 1, 1).toFixed(0)), .5)