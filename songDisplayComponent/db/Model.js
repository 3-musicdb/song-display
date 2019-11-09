/* eslint-disable camelcase */

const db = require('./db');
/* eslint-disable camelcase */
const cassInfo = require('./config/sqlConfig.js');
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'songdisplay' });
 

// Get specific song
module.exports.getSong = (song_id, res) => {

  client.execute('SELECT * FROM songs WHERE id = ' + song_id)
  .then(result => {
    let result1 = [];
    let result2 = [];
    for (let i = 0; i < result.rows.length; i++) {
      if(result.rows[i].song_data_url !== null) {
        result1.push(result.rows[i]);
      } else {
        result2.push(result.rows[i]);
      }
    }

    // result1.push(result2);
    // console.log('hello' + result1);
    result1.push(result2);
    res.end(JSON.stringify(result1));
  })
  .catch(err => res.end(err));

  // const query1 = `SELECT * FROM songs WHERE song_id = '${song_id}' LIMIT 1;`;
  // const query2 = `SELECT * FROM comments WHERE song_id = '${song_id}'`;
  // // Insert information
  // db.connection.query(query1, (err1, results1) => {
  //   if (err1) {
  //     res.end(err1);
  //   } else {
  //     db.connection.query(query2, (err2, results2) => {
  //       results1.push(results2);
  //       res.end(JSON.stringify(results1));
  //     });
  //   }
  // });
};

module.exports.insertComments = (songid, username, comment, res) => {

  client.execute("INSERT into songs ( id, commentId, comment_user_name, comment_time_stamp, comment) values (" + songid + ", now(), '" + username + "', 300, '" + comment + "')")
  .then(result => {
    console.log('inserted row');
    res.sendStatus(200);
  })
  .catch(err => {
    console.log(err);
  });

  // const query = `INSERT INTO comments (song_id, user_name, time_stamp, comment) values ${comments}`;
  // db.connection.query(query, (err, results, fields) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     res.end(JSON.stringify(results));
  //   }
  // });
};
