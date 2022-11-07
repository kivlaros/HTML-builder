const fs   = require('fs')
const rl   = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const file = `${__dirname}/text.txt`

fs.writeFile(file, '',()=>{
  console.log('please enter the data')
});

rl.on("line",async function (input) {
  if(input == 'exit'){
    console.log('please enter the data')
    process.emit("SIGINT")
  }
  let data = await fs.promises.readFile(file, 'utf-8')
  await fs.promises.writeFile(file, data + `${input}\n\n`);
  console.log('please enter the data')
});

rl.on('SIGINT', () => {
  console.log('data entry is finished')
  process.emit("SIGINT")
});

process.on("SIGINT", function () {
  process.exit();
});
