// 下载express-art-template  art-template
// app.js中的配置
//   注册一个模板引擎
//      app.engine(后缀名， express-art-template);
//         设置默认渲染引擎 app.set('view engine','.html')
//    res.render(文件名，数据对象)；
//    express这套使用，默认在当前app.js同级目录的views目录查找

// 内置中间件（处理静态资源）
// 1：创建对象 let static =express.static('./public');
// 2:配置到中间件中 app.use(static)

// 第三方中间件（post请求体的获取）
// 原生的 req.on('data=>{data.tostring()}')；

// 1: 引入express(快速开发服务器) 第三方插件
const express = require('express'); //自动逐级向上查找


// 2：构建一个服务器对象
let app = express();

// 注册一个模板引擎   渲染文件的后缀名
app.engine('.html', require('express-art-template'));

// 区分开发和生产环节的不同变量
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production',

    // debug模式  不压缩，不混淆 实时保持最新的数据
    // 非debug模式  压缩、合并   list.html 静态数据不会实时更新（服务器重启才更新）
    imports: {
        num: 1,
        reverse: function (str) {
            return '^_^' + str + '^_^'
        }
    }
});

// 设置默认渲染引擎
app.set('view engine', '.html');

// 1 获取路由中间件对象   let router = express.Router();
let router = express.Router();
// 2 配置路由规则  router.请求方式（url,fn）
router.get('/hero-list', (req, res) => {
    // render  是 res 的函数
    res.render('list.html', {
        heros: [{
            name: '刘备'
        }, {
            name: '韩信'
        }, {
            name: '貂蝉'
        }]
    });

});

app.use(router); //关联调用

// 3：开启服务器监听端口
app.listen(5454, () => {
    console.log('5454端口已被占用')
});