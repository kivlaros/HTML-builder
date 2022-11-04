const fs = require('fs');

let p = new Promise(async (res,rej)=>{
    const a = await fs.promises.readFile('text1.txt','utf-8')
    //console.log(a)
    const b = await fs.promises.readFile('text2.txt', 'utf-8')
    //console.log(b)
    res(a,b)
})

p.then((a,b)=>{
    console.log(a)
    console.log(b)
})