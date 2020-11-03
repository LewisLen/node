const puppeteer = require('puppeteer');
const fs = require('fs');
const fsPromises = require('fs/promises');
const {imagesPath,imagesDir} = require('./utils/defaultConfig.js');
const srcToImg = require('./utils/saveDoc.js');

(async () => {
 const browser = await puppeteer.launch({
  // executablePath:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: false,
  slowMo: 500,
  devtools: true,
 });

 const page = await browser.newPage();
 await page.goto('https://image.baidu.com/');
 console.log('=========百度图片========')
 // focus输入框
 await page.focus('#kw');
 await page.keyboard.sendCharacter('dog.jpg');
 console.log('=========dog dog dog=========');
 await page.click('.s_search');
 console.log('=========click click click=========');

 page.on('load', async () => {
  console.log('=========load load load=========')
  const srcs = await page.evaluate(() => {
    const images = document.querySelectorAll('img.main_img');
    return Array.prototype.map.call(images,img => img.src);
  })
  // 判断是否存在iamges文件夹，如果没有则创建文件夹
  // const tempStat = await fsPromises.stat(imagesPath);
  // if(tempStat.isDirectory()) await fsPromises.mkdir('./images');
  await fsPromises.access(imagesPath,fs.constants.R_OK | fs.constants.W_OK)
  .then(async () => {
    console.log('可以访问');
    srcs.forEach(src => {
      srcToImg(src,imagesPath)
    });
  })
  .catch(async () => {
    console.log('不可访问');
    fs.mkdirSync('./images');
    srcs.forEach(src => {
      srcToImg(src,imagesPath)
    });
  })
  await browser.close();
 })
})();