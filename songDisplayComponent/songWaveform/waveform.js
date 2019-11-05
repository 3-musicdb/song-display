



const waveform = path.resolve(__dirname, "waveForm.csv");


const writeUsers = fs.createWriteStream('waveForm.csv');

writeWaveformData(writeUsers, 'utf-8', numComments, numSongs, () => {
  writeUsers.end();
  const end = Date.now();
  console.log('total time: ' + (end - start));
})

function writeWaveformData(writer, encoding, numComments, numSongs, callback) {
  let i = 0;
  let bias = Math.floor(numSongs * 0.80);
  function write() {
    let ok = true;
    do {
      i++;
      let data = '';

      let user_name = faker.name.findName(); 
      let time_stamp = getRandomInt(360); 
      let comment = faker.lorem.sentences(getRndBias(1, 5, 1, 1).toFixed(0));
      let songId = getRndBias(1, numSongs, bias, .90);
      let uuid = Uuid.random();
      data += songId + '|||||||||||' + '"' + user_name + '"|' + '"' + time_stamp + '"|' + '"' + comment + '"|' + uuid + '\n';

      if (i === numComments) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i < numComments && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }               
  }
  write();
}