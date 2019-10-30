/* eslint-disable camelcase */
const mysql = require('mysql');

// Create connection
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'classifieD1',
  database: '5cloud_song_display',
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('\nConnected to the MySQL server.\n');
});

module.exports.connection = connection;
