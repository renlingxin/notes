// session   
// 中间件是请求与响应之间发生的一件事
const Koa = require('koa');
const path = require('path');
// 引入
const Router = require('koa-router');
const render = require('koa-art-template');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
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
    .post('/login', async ctx => {
        // 用户名 renlingxin 密码 123456
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        // 回写 cookie 保存用户数据到session中
        if (username != 'renlingxin' || password != '123456') {
            // koa 中的异常处理
            ctx.throw(200, `^_^出错了哦`);
            return; //这是个习惯 有没有暂时不影响结果
        } else {
            // 使用session保存数据
            ctx.session.user = {
                username: 'renlingxin'
            }
            ctx.body = '登陆成功';
        }

    })
.get('/list',async ctx=>{
    ctx.body = `当前用户是` + ctx.session.user.username
})


// 静态资源
app.use(static(path.resolve('./public')));

const session = require('koa-session');
// 通过任意字符串为基准进行加密算法的字符串
app.keys = ['some secret hurr'];
const CONFIG = {

    key: 'koa:sess', //session 的别名
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true, //false允许在客户端操作cookie true 不允许客户端操作

    // signed: false,未做数字签名的结果，该数据取自cookies.value   进行base64位解码得出的结果
    // {"user":{"username":"renlingxin"},"_expire":1558608671153,"_maxAge":86400000}

    signed: true, //数字签名 保证数据不被篡改
    rolling: false, //过期时间访问顺延
    renew: false, //过期后是否创建新的
};

app.use(session(CONFIG, app));

// ctx.request.body挂载属性
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());


app.listen(8887, () => {
    console.log('8887端口已经被占用')
});