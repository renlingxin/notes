//下载包   客户端=》 socket.io-client    服务器端=》koa-socket  用于将socket.io连接到koa实例

const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const static = require('koa-static');
const session = require('koa-session');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');

// 假数据
const msgs = [{
        username: '小明',
        content: '哈哈'
    },
    {
        username: '小刚',
        content: '呵呵'
    },
    {
        username: '小红',
        content: '嘻嘻'
    }
];
// 全局变量  global
global.mySessionStore = {};// 132313: {socketid:/#I4LARR47CSu5pd1EAAAB ,username}

function findBySocketId (socketid) {
    for(var tempstamp in global.mySessionStore ) {//for in 遍历数组
        let obj = global.mySessionStore[tempstamp];
        if(obj.socketid === socketid) {
          return obj;
        }
    }
  }

let app = new Koa();

//加入 socket.io  开始   
// koa-socket 对koa 兼容更好
// 这是发生在tcp协议中的  所以没有http的各种属性  例如session
const IO = require('koa-socket')

const io = new IO()

// app.use( ... )

io.attach(app) //附加到app产生关联

io.on('connection', (context) => {
    console.log('连接上了一个');
    io.broadcast('msg1', '我是服务器来的哦宝贝');
});
// 接收用户的消息
io.on('sendMsg', (context) => { //data 没有这个属性
    console.log('xxx');
    // context.socket (客户端的那个连接)
    // context.socket.socketId(私聊用的)
    console.log('消息来了', context.data.newContent);
    console.log('当前消息的socketid',context.socket.socket.id);
    // 在这里没有ctx.session 所以我们得想办法在这里拿到当前用户的

    // 查找对象的用户
    let obj = findBySocketId(context.socket.socket.id)

    // 广播给所有人
    io.broadcast('allmessage',obj.username +'对所有人说:' + context.data.newContent);

})
// 处理登录同步信息
io.on('login', context => {
    let id = context.data.id;
    console.log(context.data.id);
    console.log(context.socket.socket.id);
    global.mySessionStore[id].socketid = context.socket.socket.id
})
// 加入 socket.io 结束



render(app, {
    // 页面查找的目录
    root: path.join(__dirname, 'view'),
    // 设置后缀名
    extname: '.html',
    // debug:false  则每次压缩页面及js,包括混淆，静态数据不会实时更新 （不每次都读文件）
    debug: process.env.NODE_ENV !== 'production'
});

let router = new Router();
router.get('/', async ctx => {
        ctx.render('index'); //渲染index页面
    })
    .post('/login', async ctx => {
        let {
            username,
            password
        } = ctx.request.body;
        // 不验证直接挂载在session上
        ctx.session.user = {
            username
        }
        // 1  生成时间戳将时间戳响应给客户端（类似cookie）
        let id = Date.now();
        ctx.session.user.id = id;
        // 保存到自己的sessionStroe中
        global.mySessionStore[id] = {
            username: username
        }
        // 重定向  到聊天室
        ctx.redirect('/list')
    })
    .get('/list', async ctx => {
        // 2  接着就可以用了
        ctx.render('list', {
            username: ctx.session.user.username,
            id: ctx.session.user.id,
            msgs
        });
    })
// .post('/add', async ctx => {
//     let username = ctx.session.user.username;
//     let content = ctx.request.body.msgs;
//     // 加入到新数组中  返回最新消息回去
//     msgs.push({
//         username,
//         content
//     });
//     ctx.body = msgs;
// })




// 签名的依据
app.keys = ['test'];
// 在服务器内存中存储 {session_id:用户数据}
let store = {
    myStore: {},
    get: function (key) {
        return this.myStore[key];
    },
    set: function (key, session) {
        this.myStore[key] = session;
    },
    destroy: function () {
        delete this.myStore[key];
    }
}

// 处理静态资源
app.use(static(path.resolve('./public')));
app.use(session({store}, app, ));
// 处理请求体数据    （在路由之前
app.use(bodyParser()); // 路由
app.use(router.routes());

// 处理405 501 
app.use(router.allowedMethods());

app.listen(5555, () => {
    console.log('5555')
})