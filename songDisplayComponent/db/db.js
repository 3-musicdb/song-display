/* eslint-disable camelcase */
const cassInfo = require('./config/sqlConfig.js');
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'songdisplay' });
 

module.exports.client = client;