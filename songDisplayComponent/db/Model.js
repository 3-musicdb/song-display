/* eslint-disable camelcase */

const db = require('./db');
/* eslint-disable camelcase */
const cassInfo = require('./config/sqlConfig.js');
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'songdisplay' });
 

// Get specific song
module.exports.getSong = (song_id, res) => {

  client.execute('SELECT * FROM songs WHERE id = 324253')
  .then(result => {
    console.log(result.rows);
    res.end(JSON.stringify(result.rows));
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

module.exports.insertComments = comments => {
  const query = `INSERT INTO comments (song_id, user_name, time_stamp, comment) values ${comments}`;
  db.connection.query(query, (err, results, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.end(JSON.stringify(results));
    }
  });
};
