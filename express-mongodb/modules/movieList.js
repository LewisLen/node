const mongoose = require('mongoose');
// Schema是一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力。可以看成是表结构的定义
const Schema = mongoose.Schema;

// 链接数据库
// mongoose.connect('mongodb://localhost:27017/films');
// const db = mongoose.connection;
const db = mongoose.createConnection('mongodb://localhost:27017/films',{ useNewUrlParser: true,useUnifiedTopology: true });

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

// 创建schema
const moviesSchema = new Schema(
  {

    episodes_info: {type: String},
    rate: {type: String},
    cover_x: {type: Number},
    title: {type: String},
    url: {type: String},
    playable: {type: Boolean},
    cover: {type: String},
    id: {type: String},
    cover_y: {type: Number},
    is_new: {type: Boolean}
  }
)

// 创建model
const moviesModel = db.model('movies',moviesSchema);
// 如果Documents创建的时候没有's'，如product，则需要在参数中做个映射
// const movies = mongoose.model('prodcts',moviesSchema,'product');

// model实例有自带方法，也可以添加方法
moviesSchema.methods.findMovie = function(cb){
  return this.model('movies').find({},cb)
}

// 实例化movies
// const movies = new moviesModel();
// {
//   id: '34865507'
// }

// console.log(movies);

// movies.findMovie({},(err,doc) => {
//   if(err) console.log(err);
//   console.log('数据=========')
//   console.log(doc)
// })

module.exports = moviesModel;