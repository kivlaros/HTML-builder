const fs = require('fs')
const path = require('path');

const file = `${__dirname}/text.txt`

fs.writeFile(file, '',()=>{
  console.log('please enter the data')
});

let rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line",async function (input) {
  let data = await fs.promises.readFile(file, 'utf-8')
  await fs.promises.writeFile(file, data + `${input}\n\n`);
  console.log('please enter the data')
});

rl.on('SIGINT', () => {
  console.log('data entry is finished')
  rl.pause();
});

process.on("SIGINT", function () {
  process.exit();
});
