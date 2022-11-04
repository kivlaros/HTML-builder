const fs = require('fs');
const path = require('path')

const compDir = `${__dirname}/components`
const assetsDir = `${__dirname}/assets`
const templateDir = `${__dirname}/template.html`
const distDir = `${__dirname}/project-dist`
const distAssets = `${distDir}/assets`
const styleDir = `${__dirname}/styles`
const distStylesDir = `${__dirname}/project-dist/style.css`

async function createIndexHtml(){
  //await fs.promises.unlink(`${distDir}/index.html`) //удаляет файл, если файла нет ошибка
  //await fs.promises.mkdir(distDir, { recursive: true })
  let temp = await fs.promises.readFile(templateDir,'utf-8')
  //console.log(temp)
  const files = await fs.promises.readdir(compDir,{withFileTypes: true});
  for (const file of files){
    let data = await fs.promises.readFile(`${compDir}/${file.name}`,'utf-8')
    let componentName = file.name.split('.')[0]
    temp = temp.replace(`{{${componentName}}}`,`<!--begin ${componentName}-->\n${data}\n<!--end ${componentName}-->`)
    //console.log(componentName)
  }
  await fs.promises.writeFile(`${distDir}/index.html`, temp)
  console.log('first')
}

async function makeDir(){
  await fs.promises.mkdir(distDir, { recursive: true })
  await fs.promises.mkdir(distAssets, { recursive: true })
}

async function copyAssets(){
  const folders = await fs.promises.readdir(assetsDir,{withFileTypes: true});
  for (const folder of folders){
    if(folder.isDirectory()){
      console.log(`${distAssets}/${folder.name}`)
      await fs.promises.mkdir(`${distAssets}/${folder.name}`, { recursive: true })
      const files = await fs.promises.readdir(`${assetsDir}/${folder.name}`,{withFileTypes: true});
      for (const file of files){
        if(file.isFile()){
          await fs.promises.copyFile(`${assetsDir}/${folder.name}/${file.name}`,`${distAssets}/${folder.name}/${file.name}`)
        }
      }
    }
  }
}

async function mergeStyles(){
  await fs.promises.writeFile(distStylesDir,'')
  const files = await fs.promises.readdir(styleDir,{withFileTypes: true});
  for (const file of files){
    if(path.extname(file.name)=='.css'){
      //console.log(file)
      let data = await fs.promises.readFile(`${styleDir}/${file.name}`,'utf-8')
      await fs.promises.appendFile(distStylesDir,`${data}\n`)
    }
  }
}

async function bildPage(){
  await makeDir()
  await createIndexHtml()
  await copyAssets()
  await mergeStyles()
}

bildPage()
