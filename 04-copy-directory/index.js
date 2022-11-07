const fs = require('fs')

const dirSorce = `${__dirname}/files`
const dir = `${__dirname}/files-copy`

async function copyFiles(){
  await fs.promises.mkdir(dir, { recursive: true })
  const files = await fs.promises.readdir(dirSorce,{withFileTypes: true});
  for (const file of files){
    await fs.promises.copyFile(`${dirSorce}/${file.name}`,`${dir}/${file.name}`)
    console.log(`${dirSorce}/${file.name}`)
  }
}
async function deleteFolder(){
  try{
    await fs.promises.access(dir)
    await fs.promises.rm(dir,{recursive: true})
  }catch{
    
  }
}

async function copyDirectory(){
  await deleteFolder()
  await copyFiles()
}

copyDirectory()
