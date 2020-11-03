const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const util = require('util');
const fsPromises = require('fs/promises');
// const writeFile = util.promisify(fs.writeFile);


const urlToImg = util.promisify((url,dir,callback) => {
  const mod = /^https:/.test(url) ? https:http;
  const ext = path.extname(url);
  const docName = path.join(dir,`${Date.now()}${ext}`);
  console.log('=====urlToImg=====');
  console.log(docName);
  try{
    mod.get(url,res => {
      res.pipe(fs.createWriteStream())
      .on('finish',() => {
      callback();
      });
    })
  }catch{
    console.log('==========not jpg==========')
  }
})

const base64ToImg = util.promisify((base64Str,dir) => {
  const matches = base64Str.match(/^data:(.+?);base64(.+)$/);
  console.log('mathcs===',matches)
  try{
    const ext = matches[1].split('/')[1].replace('jpeg','jpg');
    const docName = path.join(dir,`${Date.now()}.${ext}`);
    // writeFile(docName,matches[2],'base64');
    fsPromises.writeFile(docName,matches[2],'base64');
    console.log('=====base64ToImg=====');
    console.log(docName);
  }catch(err){
    console.log('not base64==',err)
  }
})

module.exports = async (src,img) =>{
 if(/\.(jpg|gif|png|jpeg)$/.test(src)){
  await urlToImg(src,img);
 }else{
  await base64ToImg(src,img);
 }
}