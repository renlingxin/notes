const Koa = require('koa');
const Router = require('koa-router');

let app = new Koa();
let router = new Router();

router.get('/', async ctx => {
    ctx.body = {
        token:'abc',
        msg:'ok'
    }
})

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8888, () => {
    console.log('8888')
})