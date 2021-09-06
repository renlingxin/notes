// router  中间件

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// 引入
const Router = require('koa-router');

var app = new Koa();

// 配置路由对象
let router = new Router();
// 规则
router.get('/', async ctx => {
        ctx.body = '首页'
    })
    .post('/post', async ctx => {
        ctx.body = ctx.request.body; //直接响应请求体数据

    })
// 处理请求体数据
app.use(bodyParser());

// 路由产生关联
app.use(router.routes());//将路由与实例挂钩

// 优化状态码的处理405 和 501 不再是全部的404
// 405 代表请求的url有 ，但是没有写该请求方式的响应
// 501 服务器不支持该请求方式
app.use(router.allowedMethods());

app.listen(7777, () => {
    console.log('7777端口已经被占用')
});