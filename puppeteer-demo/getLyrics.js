// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-core');
const fs = require('fs');
 
(async () => {
	const browser = await(puppeteer.launch({
		executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false,
		defaultViewport: { width: 1440, height: 1000 },
		args: [`--window-size=${1440},${1000}`],
	}));
	const page = await browser.newPage();
	await page.goto('https://music.163.com/#');
	// 音乐名称
	let musicName = '你的答案';
	// 输入内容的元素选择器，如果匹配到多个元素，则输入到第一个匹配的元素
	await page.type('#srch',musicName,{delay:0});
	// 回车搜索
	await page.keyboard.press('Enter');
	// 获取列表
	await page.waitFor(2000);
	// page.frames()获取页面中所有iframe标签，并且找到满足条件的第一个元素
	let iframe = await page.frames().find(f => f.name() === 'contentFrame');
	const SONG_LS_SELECTOR = await iframe.$('.srchsongst');

	const selectedSongHref = await iframe.evaluate(e => {
	  	const songList = Array.from(e.childNodes);
	  	const idx = songList.findIndex(v => v.childNodes[1].innerText.replace(/\s/g, '') === '你的答案');
	  	return songList[idx].childNodes[1].firstChild.firstChild.firstChild.href;
	}, SONG_LS_SELECTOR);

	// 进入歌曲页面
  await page.goto(selectedSongHref);
  // 获取歌曲页面嵌套的 iframe
  await page.waitFor(2000);
  iframe = await page.frames().find(f => f.name() === 'contentFrame');
  // 点击 展开按钮
  const unfoldButton = await iframe.$('#flag_ctrl');
  await unfoldButton.click();
  // 获取歌词
  const LYRIC_SELECTOR = await iframe.$('#lyric-content');
  const lyricCtn = await iframe.evaluate(e => {
    return e.innerText;
  }, LYRIC_SELECTOR);

  console.log(lyricCtn);
  // 截图
  await page.screenshot({
    path: `${musicName}.png`,
    fullPage: true,
  });

  // 写入文件
  let writerStream = fs.createWriteStream(`${musicName}.txt`);
  writerStream.write(lyricCtn, 'UTF8');
  writerStream.end();

  // 获取评论数量
  const commentCount = await iframe.$eval('.sub.s-fc3', e => e.innerText);
  console.log(commentCount);

  // 获取评论
  const commentList = await iframe.$$eval('.itm', elements => {
    const ctn = elements.map(v => {
      return v.innerText.replace(/\s/g, '');
    });
    return ctn;
  });
  console.log(commentList);
})()

























