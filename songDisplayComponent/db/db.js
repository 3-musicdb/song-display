/* eslint-disable camelcase */
const cassInfo = require('./config/sqlConfig.js');
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'songdisplay' });
 

client.execute('SELECT comment FROM songs WHERE id = 324253')
  .then(result => console.log('hello', result.rows[1].comment))
  .catch(err => console.log(err));