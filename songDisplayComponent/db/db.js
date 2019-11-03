/* eslint-disable camelcase */
const mysql = require('mysql');
const sqlInfo = require('./config/sqlConfig.js');

// Create connection
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: sqlInfo.SQL_PASSWORD,
  database: '5cloud_song_display',
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('\nConnected to the MySQL server.\n');
});

module.exports.connection = connection;
