const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// 链接数据库
mongoose.connect('mongodb://localhost:27017/films');
const db = mongoose.connection;
// 链接成功
db.on('connected',() => {
  console.log("Mongoose connection open to " + 'mongodb://localhost:27017/films');
})
// 链接异常
db.on('error',(err) => {
  console.log("Mongoose connection error " + err);
})
// 断开链接
db.on('disconnected',() => {
  console.log('Mongoose connection disconnected');
})

const moviesSchema = new Schema({
  // rate: String,
  // cover_x: Number,
  // title: String,
  // url: String,
  // playable: Boolean,
  // cover: String,
  // id: String,
  // cover_y: Number,
  // is_new: Boolean
  testName: String
})

// model实例有自带方法，也可以添加方法
// moviesSchema.methods.findMovie = function(cb){
//   return this.model('movies').find({},cb)
// }

// 创建model
const movies = mongoose.model('movies',moviesSchema);
// 如果Documents创建的时候没有's'，如product，则需要在参数
// const movies = mongoose.model('prodcts',moviesSchema,'product');

// 实例化movies
// const yaoShen = new movies({
//   id: '26752088'
// });

// movies.findMovie(function (err, yaoShen) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(yaoShen);
//   }
// });
movies.find({},(err,doc) => {
  if(err) console.log(err);
  console.log('数据=========')
  console.log(doc)
})

module.exports = movies;

// {
//   "rate" : "9.0",
//   "cover_x" : 2810,
//   "title" : "我不是药神",
//   "url" : "https://movie.douban.com/subject/26752088/",
//   "playable" : true,
//   "cover" : "https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2561305376.jpg",
//   "id" : "26752088",
//   "cover_y" : 3937,
//   "is_new" : false
// }, 