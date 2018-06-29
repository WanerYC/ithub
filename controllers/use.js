// 引入mysql
const db = require('./db-helper');
const md5 = require('md5');


// 1 渲染登陆页面
exports.showSignin = (req, res) => {
    // res.send('showSignin');
    res.render('signin.html');
};
// 2 处理登陆请求
exports.handlSignin = (req, res) => {
    // res.send('handlSignin');
    // 获取到数据
    // 判断邮箱是否存在
    // 判断密码是否正确
    db.query(
        'select * from `users` where `email` = ?',
        req.body.email,
        (err, results) => {
            console.log(results)
            if(err) {
                return res.send('检测邮箱服务器内部出现错误')
            }
            if(results.length <= 0 ) {
                // 邮箱不存在
                return res.json({
                    code: 401,
                    msg:"账号不存在"
                })
            }
            // 判断密码
            const password = md5(req.body.password)
            if(password !== results[0].password) {
                return res.json({
                    code:402,
                    msg:'密码错误'
                })
            }
            res.json({
                code:200,
                msg:'登录成功'
            })
        }
    )
};
// 2 渲染注册页面
exports.showSignup = (req, res) => {
    // res.send('signup.html');
    res.render('signup.html')
};
// 2 处理注册页面
exports.handlSignup = (req, res) => {
    // res.send('handlSignup');
    // 添加数据前要做数据验证
    // 验证邮箱 / 昵称是否重复 
    // db.query('mysql语句(增删改查)', 回调函数)

    db.query(
        'select * from `users` where email = ?',
        req.body.email,
        (err,results) => {
            if(err) {
                return res.send('检测邮箱时服务器内部错误')
            }
            // console.log(results);
            if(results.length > 0) {
                res.render('signup.html', {
                    msg:"邮箱已存在"
                });
                return;
            }
            // 验证昵称是否重复
            db.query(
                'select * from `users` where `nickname`=?',
                req.body.nickname,
                (err,results) => {
                    if(err) {
                        return res.send('检测昵称时服务器内部错误');
                    }
                    if(results.length > 0) {
                        // 说明昵称已存在
                        res.send('signup.html', {
                            msg:"昵称已经存在"
                        })
                        return;
                    }
                    // 插入数据
                    // 获取到post数据配置 body-parser
                    req.body.createdAt = new Date();
                    // 密码进行处理
                    req.body.password = md5(req.body.password);

                    // 插入数据库
                    db.query(
                        'insert into `users` set ?',
                        req.body,
                        // console.log(req>body)
                        (err,results) => {
                            if(err) {
                                console.log(err);
                                return res.send('插入数据时服务器内部错误')
                            }
                            console.log(results);
                            if(results.affectedRows === 1) {
                                // 注册成功
                                res.redirect('/signin');

                            }else {
                                res.render('signup.html', {
                                    msg:'注册失败'
                                })
                            }
                        }
                    )
                }
            )
        }
    )


};
// 2 处理退出请求
exports.handlSignout = (req, res) => {
    res.send('handlSignout');
};
