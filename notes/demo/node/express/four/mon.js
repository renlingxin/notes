// nodemon 
//   修改代码自动重启
//   安装全局命令行工具  npm i -g nodemon
//   进入到指定目录命令行  nodemon ./xxx.js
//   手动触发重启，在命令行输入rs回车


// 1: 引入express(快速开发服务器) 第三方插件
const express = require('express'); //自动逐级向上查找
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
// 静态文件中间件  错误处理（优化用户体验）   404处理

// 2：构建一个服务器对象
let app = express();

let heros = [
    // {
    //     name: '小米电视1',
    //     img: 'imgs/xiaomi1.jpg'
    // },
    // {
    //     name: '小米电视2',
    //     img: 'imgs/xiaomi2.jpg'
    // },
    // {
    //     name: '小米笔记本1',
    //     img: 'imgs/xiaomi2.jpg'
    // },
    // {
    //     name: '小米笔记本2',
    //     img: 'imgs/xiaomi4.jpg'
    // },
]


// 注册一个模板引擎   渲染文件的后缀名
app.engine('.html', require('express-art-template'));

// 区分开发和生产环节的不同变量
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',
});

// 设置默认渲染引擎
app.set('view engine', '.html');


// 1 获取路由中间件对象   let router = express.Router();
let router = express.Router();
// 2 配置路由规则  router.请求方式（url,fn）
router.get('/', (req, res, next) => {
        res.render('index', {
            heros, //es6 属性简写 ，key,value 是同名的
        });
    })
    .post('/add', (req, res, next) => {
        // 解析文件  用包
        var form = new formidable.IncomingForm();
        // 修改上传目录
        form.uploadDir = path.join(__dirname, 'public', 'imgs')
        // 保持原有后缀名
        form.keepExtensions = true;
        // 解析
        form.parse(req, function (err, fields, files) {
            // console.log(fields);   fields.nickname = >用户名
            // console.log(files);  files.avater.path => 图片的路径
            // path.parse(路径).base 文件名
            let nickname = fields.nickname;
            let filename = path.parse(files.avater.path).base;
            let img = 'imgs/' + filename;
            heros.push({
                nickname,img
            })
            // 同步提交  浏览器等待页面显示
            res.redirect('/');//重定向自己  就相当于刷新
        });
    })
    //  二  404处理   最后一条路由   
    .all('*', (req, res) => {
        res.send('未知页面')
    })

// 处理图片  暴露出来
app.use(express.static('./public'));

app.use(router); //关联调用

// 三 处理错误  参数位置错误优先   "/"   这个不能错
app.use((err, req, res, next) => {
    res.send('<h1>您访问定的页面不存在，<a href="/">点这里试试看</a></h1>'); //send   能对html进行操作  真实项目中比较少用
});
// 3：开启服务器监听端口
app.listen(4399, () => {
    console.log('4399端口已被占用')
});