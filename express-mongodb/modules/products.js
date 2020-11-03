const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 链接数据库
mongoose.connect('mongodb://localhost:27017/product');
const db = mongoose.connection;
// 链接成功
db.on('connected',() => {
  console.log("Mongoose connection open to " + 'mongodb://localhost:27017/product');
})
// 链接异常
db.on('error',(err) => {
  console.log("Mongoose connection error " + err);
})
// 断开链接
db.on('disconnected',() => {
  console.log('Mongoose connection disconnected');
})

const productsSchema = new Schema({
  productName: String,
  price: Number,
  productDate: String,
  typeId: String,
  typeText: String
})

// model实例有自带方法，也可以添加方法
productsSchema.methods.findProductType = function(cb){
  return this.model('products').find({typeId:this.typeId},cb)
}

// 创建model
const products = mongoose.model('products',productsSchema);
// 如果Documents创建的时候没有's'，如product，则需要在参数
// const products = mongoose.model('prodcts',productsSchema,'product');

// 实例化products
const Txu = new products({
  typeId: '4'
});
Txu.findProductType(function (err, Txu) {
  if (err) {
    console.log(err);
  } else {
    console.log(Txu);
  }
});

module.exports = products;