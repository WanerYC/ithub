// 程序入口
// 负责 1 配置  2 监听端口
var express = require('express')
var app = express()
// console.log(app)

// 接收路由
const router = require('./routes/router')

app.listen(3000, () => {
    console.log('开启成功,监测3000端口')
})

// 注册路由
app.use(router)