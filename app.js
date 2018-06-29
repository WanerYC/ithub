// 程序入口
// 负责 1 配置  2 监听端口
// 引包
const expressArtTemplate = require('express-art-template');
const bodyParser = require('body-parser')
var express = require('express')
var app = express()
// console.log(app)

// 配置模板引擎
app.engine('html', expressArtTemplate);

// 统一处理静态资源
app.use('/node_modules',express.static('./node_modules'))
app.use('/public',express.static('./public'))

// 获取表单数据
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
// app.use(bodyParser.json())

// 接收路由
const router = require('./routes/router')

app.listen(3000, () => {
    console.log('开启成功,监测3000端口')
})

// 注册路由
app.use(router)