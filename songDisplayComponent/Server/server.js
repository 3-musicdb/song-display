/* eslint-disable camelcase */
require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../db/Model');
const compression = require('compression');
// const morgan = require('morgan');

const app = express();

app.use(express.json());
// app.use(morgan('dev'));

// Sidebar is on port 5000; use 5001
const port = 5001;

// CORS Policy
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Compress files
app.use(compression({filter: shouldCompress}));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.get('/loaderio-a9ea67f314db9b6614c8f41219ad33bd/', (req, res) => {
   res.sendFile('/home/ec2-user/song-display/songDisplayComponent/public/loaderio-a9ea67f314db9b6614c8f41219ad33bd.txt');
});

app.get('/loaderio-3000a7fe72c6414b3a1eb2ee85ccff2c/', (req, res) => {
  res.sendFile('/home/ec2-user/song-display/songDisplayComponent/public/loaderio-3000a7fe72c6414b3a1eb2ee85ccff2c.txt');
});

// Serve the static index file from the React app
app.use('/:song_id', express.static(path.join(__dirname, '../public/')));

// Get specific song
app.get('/getSong/:song_id', (req, res) => {
  // console.log('at the component');
  const song_id = req.params.song_id;
  db.getSong(song_id, res);
});

app.post('/postComment/', (req, res, next) => {
  // const song_id = req.params.song_id;
  //songid, username, comment
  // console.log(req.body);
  db.insertComments(req.body.id, req.body.username, req.body.comment, res);
});

// Return stringified JSON of all 100 song information objects from mysql
app.get('/query/all-songs', (req, res) => db.getAllSongs(res));

// Return only ten songs
app.get('/query/ten-songs', (req, res) => db.getTenSongs(res));

// Return only three songs
app.get('/query/three-songs', (req, res) => db.getThreeRandomSongs(res));

// Return only one song
app.get('/query/one-song', (req, res) => db.getOneSong(res));

app.listen(port, () => console.log(`Express App running on port ${port}`));
