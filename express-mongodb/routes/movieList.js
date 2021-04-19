const express = require('express');
const router = express.Router();
const movieList = require('../modules/movieList');


router.get('/', function(req, res, next) {
  console.log(res)
  // 查看数据库
  // 获取参数
  const pageSize = parseInt(req.param("pageSize")) || 5;
  const pageNumber = parseInt(req.param("pageNumber")) || 1;
  // const sortPram = req.param("sortPram") || 1;
  let params = {};
  let skip = (pageNumber - 1) * pageNumber;
  // 按照价格
  const movieListModel = movieList.find(params).skip(skip).limit(pageSize)

  movieListModel.exec((err,doc) => {
    console.log(doc)
    if (err) {
      res.json({
        returnCode: '0001',
        message: 'msg'
      })
    } else {
      res.json({
        returnCode: '000',
        message: '链接成功',
        length: doc.length,
        data: doc
      })
    }
  })
})

module.exports = router;