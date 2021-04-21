# express+mongodb

利用express快速搭建服务，mongdodb数据库


## express

```shell
# 安装express和express-generator
npm install express express-generator -g --registry=https://registry.npm.taobao.org
# 生产express服务
express express-demo
# 安装依赖
cd express-demo
npm install
# 启动服务
npm start
# 或者
node bin/www
```

express 支持html模版

```javascript
// 安装ejs模板
const ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
```


## mongoose

### 安装mongoose

mongoose依赖于Schema，每个Schema映射一个MongoDB collection

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 链接数据库
mongoose.connect('mongodb://localhost:27017/product');
const db = mongoose.connection;
// 链接成功
db.on('connected',() => {
  console.log("Mongoose connection open to " + 'mongodb://localhost:27017/product');
})
const productsSchema = new Schema({
  productName: String,
  price: Number,
  productDate: String,
  typeId: String,
  typeText: String
})
// 创建model
const products = mongoose.model('products',productsSchema);
// 如果Documents创建的时候没有's'，如product，则需要在参数
// const products = mongoose.model('prodcts',productsSchema,'product');
module.exports = products
```

> 创建model的时候，需要特别注意，如果mongodb创建collections的时候命名没有加's'，则需要在后边加上名称，否则无法链接到数据库

### mongoose-model

把schema转换为一个model，model实例有自带的方法，也有自定义方法

```javascript
// model实例有自带方法，也可以添加方法
productsSchema.methods.findProductType = function(cb){
  return this.model('products').find({typeId:this.typeId},cb)
}
const Txu = new products({typeId:'4'});
Txu.findProductType(function(err,Txu){
  if(err){
    console.log(err);
  }else{
    console.log(Txu);
  }
})
```

## mongodb

### 启动

安装mongodb之后就可以进行操作了，可以将安装目录bin的路径配置到path路径上，也可以直接在bin目录下启动cmd操作

```shell
mongod --dbpath E:\mongoLen\data --logpath E:\mongoLen\log\mongo.log
# 用配置文件启动
# 切换到安装目录下
mongod --config E:\mongoLen\mongo.conf
# 配置server
mongod --config E:\mongoLen\mongo.conf --install --serviceName "mongoDB"
# 启动之后保持mongod窗口不变，执行mongo，可以操作mongo了
mongo 
```

关于config配置，可以进行以下配置

```shell
# 数据库路径
dbpath=E:\mongoLen\data\
# 日志输出文件路径
logpath=E:\mongoLen\log\mongo.log
# 错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件
logappend=false
# 启用日志文件，默认启用
journal=true
# 这个选项可以过滤掉一些无用的日志信息
quiet=false
# 端口号
# port=27017
# 指定存储引擎（默认先不加此引擎，如报错，再加进去，32位才要加）
# strageEngine=mmapv1
```

### 基本操作

```shell
# 查看所有db列表
show dbs 
# 查看所有集合
show collections
# 查看当前所在数据库
db
# 创建/使用数据库
use dmeo
# 在当前数据库下创建集合product
db.createCollection('products')
# 另外一种创建集合productList的方式
db.productList.insert({name:'T恤',price: 89});
# 删除数据库
db.dropDatabase()
# 删除product集合
db.product.drop()
```

### 导入数据

> 利用mongoimport导入json文件时macOs报错：无法打开xxx ，因为无法验证开发者的问题
> ```shell
> # 导入文件
> mongoimport --db dbName --collection collectionName --jsonArray --file filePath
> # 解决没法打开，无法验证开发者问题
> sudo spctl --master-disable
> ```
> 导入json文件时主要要加`--jsonArray`参数
> 导入json文件的时候不用直接在运行mongo的命令行工具上导入，应另起命令行工具


## mongo问题集合

```shell
DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
```

在创建链接数据库时，新增`{ useNewUrlParser: true }`属性即可

```javascript
const db = mongoose.createConnection('mongodb://localhost:27017/product',{ useNewUrlParser: true,useUnifiedTopology: true });
```





## cookie

### cookie-parser

`cookie-parser`是express的一个中间件，