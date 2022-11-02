const fs = require('fs')

const dirSorce = `${__dirname}/files`
const dir = `${__dirname}/files-copy`

async function copuDirectory(){
  await fs.promises.mkdir(dir, { recursive: true })
  const files = await fs.promises.readdir(dirSorce,{withFileTypes: true});
  for (const file of files){
    await fs.promises.copyFile(`${dirSorce}/${file.name}`,`${dir}/${file.name}`)
    console.log(`${dirSorce}/${file.name}`)
  }
}

copuDirectory()
