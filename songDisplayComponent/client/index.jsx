/* eslint-disable camelcase */
import SongDisplay from './SongDisplay';
import React from 'react';
import ReactDOM from 'react-dom';

// Get song id from url
const splits = document.URL.split('/');
const song_id = splits[splits.length - 2];

ReactDOM.render(
  <SongDisplay song_id={song_id} />,
  document.querySelector('#SongDisplay')
);
