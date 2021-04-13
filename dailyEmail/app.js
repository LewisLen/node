const superagent = require('superagent');
const cheerio = require('cheerio');
const ejs = require('ejs'); //ejs模版引擎
const fs  = require('fs'); //文件读写
const path = require('path'); //路径配置
const nodemailer = require('nodemailer'); //发送邮件的node插件

async function getInfo(){
  return new Promise((resolve)=>{
    superagent.get('http://wufazhuce.com/').end((err,res) => {
      if(err) console.log(err);
      // 加载一个html就可以像jQuery使用了
      let $ = cheerio.load(res.text);
      let item = $('#carousel-one .carousel-inner .item');
      let todayItem = item[0];
      let todayItemInfo = {
        // 获取每日图片地址
        img: $(todayItem).find('.fp-one-imagen').attr('src'),
        // 获取每日标题
        title:$(todayItem).find('.fp-one-imagen-footer').text().replace(/(^\s*)|(\s*$)/g, ""),
        // 每日句子
        text:$(todayItem).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
      }
      resolve(todayItemInfo)
    })
  })
}
(async () => {
  const emailInfo = await getInfo();
  // 将目录下的mail.ejs获取到，得到一个模版
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, 'mail.ejs'), 'utf8')
  );
  // 将数据传入模版中，生成HTML
  const html = template(emailInfo);
  console.log(html)
  
  let transporter = nodemailer.createTransport({
    service: '126', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {   //发送者的账户密码
      user: 'csshack2016@126.com', //账户
      pass: 'KWKWSLYZGKVJPHRF', //smtp授权码，到邮箱设置下获取
    }
  });

  let mailOptions = {
    from: 'csshack2016@126.com', // 发送者昵称和地址
    to: '1037745726@qq.com', // 接收者的邮箱地址
    subject: '一封暖暖的小邮件', // 邮件主题
    // text: 'test mail',  //邮件的text
    html: html  //也可以用html发送  
  };
    
  //发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('邮件发送成功 ID：', info.messageId);
  });

})()