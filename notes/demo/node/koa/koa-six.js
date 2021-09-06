// static   art-template
const Koa = require('koa');
const path = require('path');
// 引入
const Router = require('koa-router');
const render = require('koa-art-template');
const static = require('koa-static');

// request.url=  赋值操作 设置请求 url ,对url重写有用

var app = new Koa();
render(app, {
    // 页面查找的目录
    root: path.join(__dirname, 'view'),
    // 设置后缀名
    extname: '.html',
    // debug:false  则每次压缩页面及js,包括混淆，静态数据不会实时更新 （不每次都读文件）
    debug: process.env.NODE_ENV !== 'production'
});


// 配置路由对象 
let router = new Router();
router.get('/', async ctx => {
    ctx.render('index')
})
// 在静态资源的处理之前，重写url，改变用户url的请求
app.use(async (ctx, next) => {
    if (ctx.url.startsWith('/public')) {
        // 改写url请求
        ctx.url = ctx.url.replace('/public', '');
    }
    // 放行 交给static来处理（不管如何都放行）
    await next();
    console.log('hahha!!!');
});

// 静态资源
app.use(static(path.resolve('./public')));

// 关联
app.use(router.routes());
app.use(router.allowedMethods());



app.listen(8080, () => {
    console.log('8080端口已经被占用')
});