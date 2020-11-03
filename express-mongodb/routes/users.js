const express = require('express');
const router = express.Router();
const Users = require('../modules/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req)
  res.sen('respond with a resource');
});

router.post('/login',(req,res,next) => {
  let params = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  Users.findOne({params},(err,doc) => {
    if (err) {
      res.json({
        returnCode: '0001',
        message: '账号密码错误'
      })
    } else {
      if(doc){
        res.json({
          returnCode: '000',
          message: '链接成功',
          data: {
            userName: doc.userName,
          }
        })
      }

    }
  })
})

module.exports = router;
