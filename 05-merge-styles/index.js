const fs = require('fs');
const path = require('path')

const styleDir = `${__dirname}/styles`
const distDir  = `${__dirname}/project-dist/bundle.css`

async function mergeStyles(){
  await fs.promises.writeFile(distDir,'')
  const files = await fs.promises.readdir(styleDir,{withFileTypes: true});
  for (const file of files){
    if(path.extname(file.name)=='.css'){
      //console.log(file)
      let data = await fs.promises.readFile(`${styleDir}/${file.name}`,'utf-8')
      await fs.promises.appendFile(distDir,`${data}\n`)
    }
  }
}


mergeStyles()