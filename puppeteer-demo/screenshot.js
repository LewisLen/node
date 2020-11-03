// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core');
const fsPromises = require('fs/promises');
// 利用promisify可以使用async/await
// const fs = require('fs');
// const util = require('util');
// const mkdir = util.promisify(fs.mkdir);
// 截图
(async () => {
  // launch启动chrome浏览器而不是Chromium
  const browser = await puppeteer.launch({
    // window和macOs两种Chrome浏览器路径
    // executablePath:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
    slowMo: 500,
    devtools: true
  });
  // 打开新网页进入指定页面
  const page = await browser.newPage();
  await page.goto('https://cn.bing.com/');
  // 如果没有文件夹则创建screenshot文件夹
  // await mkdir('screenshot');
  await fsPromises.mkdir('./screenshot');
  // 屏幕截图保留在screenshot文件夹下
  await page.screenshot({path: './screenshot/bing.png'});
  // 关闭浏览器
  await browser.close();
})();