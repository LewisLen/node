# puppeteer

puppeteer 是一款爬虫利器，在安装的时候 puppeteer 也会自动安装 Chromium 浏览器，但是由于国内网络原因，是没法直接安装成功，可以选择安装 puppeteer-core 或者设置跳过下载 Chromium，调试的时候则直接选择 Chrome 浏览器。

```shell
# 初始化
npm init -y
# 安装puppeteer
npm i puppeteer --save
# 可以跳过下载 Chromium
set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
# 也可以使用淘宝镜像下载
npm i puppeteer --save --registry=https://registry.npm.taobao.org
# 或者直接安装puppeteer-core
npm i puppeteer-core --save --registry=https://registry.npm.taobao.org
```

## 截取网页图片

screenshot.js 主要是利用page方法，创建文件夹使用 promisify 封装 fs.mkdir 方法返回promise对象，这样才能使用async/await方法

```javascript
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
  // 创建screenshot文件夹
  // await mkdir('screenshot');
  await fsPromises.mkdir('./screenshot');
  // 屏幕截图保留在screenshot文件夹下
  await page.screenshot({path: './screenshot/bing.png'});
  // 关闭浏览器
  await browser.close();
})();
```

## 通过网易云音乐保存歌词

getLyrics.js  

## 截取网页图片——screenshot

baiduimage.js  
