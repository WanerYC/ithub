// route 路由规则
// router 路由对象

// router.js 职责 设置路由 设计路由
var express = require('express');
// const app = express()
// 引入处理数据模块
const indexCtrl = require('../controllers/index');
const useCtrl = require('../controllers/use');

const router = express.Router();

// 将路由暴露出去  在app.js 接收 
module.exports = router;

// 登录  注册  退出
// 渲染首页
router.get('/', indexCtrl.showIndex)
    // 渲染登录页面
    .get('/signin', useCtrl.showSignin)
    // 处理登录请求
    .post('/signin', useCtrl.handlSignin)
    // 渲染注册页面
    .get('/signup', useCtrl.showSignup)
    // 处理注册情趣
    .get('/signup', useCtrl.handlSignup)
    // 处理退出请求
    .get('/signout', useCtrl.handlSignout)
