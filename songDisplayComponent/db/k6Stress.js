import http from "k6/http";
import { sleep, check } from "k6";
import { Rate } from 'k6/metrics';
// const faker = require('faker');

export let getERrorRate = new Rate('get errors');

export let options = {
  vus: 200,
  rps: 1600,
  duration: '5m'
};

export default function() {
  let res = http.get("http://localhost:5001/getSong/" + getRandomInt(10000000) );
    check(res, {
      'status was 200' : res => res.status === 200, 
      'has results' : res => res.body.length > 0
    }) || getErrorRate.add(1);
};

// export default function() {
//   var url = "http://localhost:5001/postComment/";
//   let songId = getRndBias(1, 10000000, 8000000, .95);
//   let user_name = 'George Nelson';
//   // let user_name = faker.name.findName(); 
//   let time_stamp = getRandomInt(360); 
//   // let comment = faker.lorem.sentences(getRndBias(1, 5, 1, 1).toFixed(0));
//   let comment = "this is a random comment";
//   var payload = JSON.stringify({ id: songId, username: user_name, comment: comment });
//   var params =  { headers: { "Content-Type": "application/json" } }
//   let res = http.post(url, payload, params);
//   check(res, {
//     'status was 200' : res => res.status === 200, 
//   }) || getErrorRate.add(1);
// };


function getRndBias(min, max, bias, influence) {
  var rnd = Math.random() * (max - min) + min,   // random in range
      mix = Math.random() * influence;           // random mixer
  return Math.trunc(rnd * (1 - mix) + bias * mix); // mix full range and bias
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max - 1)) + 1;
}