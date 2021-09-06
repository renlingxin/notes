// 1: 引入express(快速开发服务器) 第三方插件
const express = require('express'); //自动逐级向上查找
const fs = require('fs');

// 静态文件中间件  错误处理（优化用户体验）   404处理

// 2：构建一个服务器对象
let app = express();


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
        // console.log('cc');
        // 假如获取文件
        // let errorPath = '.abc/e.txt';
        try {
            // fs.readFileSync(errorPath);
            res.render('index');
        } catch (err) {
            // throw err; //  给用户看到 代码错误 
            next(err); // 触发一个具备4个参数的中间件函数
        }
    })
    //  二  404处理   最后一条路由   
    .all('*', (req, res) => {
        res.send('未知页面')
    })


// 要把public下的文件暴露出来   当虚拟目录 /public 被匹配后，未来的url都会去掉/public
app.use('/public', express.static('./public'));

app.use(router); //关联调用

// 三 处理错误  参数位置错误优先   "/"   这个不能错
app.use((err, req, res, next) => {
    res.send('<h1>您访问定的页面不存在，<a href="/">点这里试试看</a></h1>');//send   能对html进行操作  真实项目中比较少用
});
// 3：开启服务器监听端口
app.listen(5255, () => {
    console.log('5255端口已被占用')
});