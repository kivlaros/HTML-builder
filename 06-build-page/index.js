const fs   = require('fs')
const path = require('path')

const compDir       = `${__dirname}/components`
const assetsDir     = `${__dirname}/assets`
const templateDir   = `${__dirname}/template.html`
const distDir       = `${__dirname}/project-dist`
const distAssets    = `${distDir}/assets`
const styleDir      = `${__dirname}/styles`
const distStylesDir = `${__dirname}/project-dist/style.css`

async function createIndexHtml(){
  let temp = await fs.promises.readFile(templateDir,'utf-8')
  const files = await fs.promises.readdir(compDir,{withFileTypes: true});
  for (const file of files){
    let data = await fs.promises.readFile(`${compDir}/${file.name}`,'utf-8')
    let componentName = file.name.split('.')[0]
    temp = temp.replace(`{{${componentName}}}`,`<!--begin ${componentName}-->\n${data}\n<!--end ${componentName}-->`)
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
      let data = await fs.promises.readFile(`${styleDir}/${file.name}`,'utf-8')
      await fs.promises.appendFile(distStylesDir,`${data}\n`)
    }
  }
}

async function deleteFolder(){
  try{
    await fs.promises.access(distDir)
    await fs.promises.rm(distDir,{recursive: true})
  }catch{
  }
}

async function bildPage(){
  await deleteFolder()      //удаляем директорию project-dist
  await makeDir()           //создаем директории
  await createIndexHtml()   //собираем и создаем index.html
  await copyAssets()        //копируем директорию assets со всем содержимым
  await mergeStyles()       //собираем и создаем style.css
}

bildPage()