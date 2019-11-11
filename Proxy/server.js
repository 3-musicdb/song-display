require('newrelic');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.use('/:songid', express.static(path.join(__dirname, './public')));

app.get('/getSong/:song_id', (req, res) => {
  const song_id = req.params.song_id;
  // console.log('at the proxy');
  // let wholePath = window.location.origin+window.location.pathname;
  // let pathArray = wholePath.split(':');
  // let baseUrl = 'http:' + pathArray[1];
  // res.redirect(301, `${baseUrl}/getSong/${song_id}`);
  res.redirect(301, `http://localhost:5001/getSong/${song_id}`);
});

app.listen(3010);