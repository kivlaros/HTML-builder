const fs 	 = require('fs');
const path = __dirname;

let readableStream = fs.createReadStream(`${path}/text.txt`, 'utf8')
readableStream.on('data', function(chunk) { 
	console.log(chunk);
});

