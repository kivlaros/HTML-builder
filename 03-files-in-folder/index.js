const fs = require('fs')
const path = require('path')

const dir = `${__dirname}/secret-folder`

async function filesInFolder(){
  const files = await fs.promises.readdir(dir,{withFileTypes: true});
  for (const file of files){
    if(file.isFile()){
      fs.stat(`${dir}/${file.name}`, (err, stats)=>{
        let type = path.extname(file.name)
        let size = Math.ceil((+stats.size)/1000 )
        let name = file.name.slice(0,file.name.length-type.length)
        console.log(`${name} - ${type.slice(1)} - ${size}kb`);
      })
    }
  }
}

filesInFolder()