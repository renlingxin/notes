const Koa = require('koa');
const Router = require('koa-router');

let app = new Koa();
let router = new Router();

router.get('/', async ctx => {
        ctx.body = {
            token: 'abc',
            msg: 'ok'
        }
    })
    .post('/add', async ctx => {
        ctx.req.on('data',data=>{
            console.log(data.toString());
        })
        ctx.body = 'renlingxin'
    })
    .post('/upload', async ctx => {
        console.log('上传成功');
        ctx.body = 'shanghuan  chenggong';
    })
// 跨域解决方法
app.use(async (ctx, next) => {
    console.log(ctx.request.header.origin);
    ctx.response.set('Access-Control-Allow-Origin', '*');

    ctx.response.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,');
    ctx.response.set('Access-Control-Allow-Headers', 'token');
    await next();
});
app.use(router.routes());

app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log('8888')
})