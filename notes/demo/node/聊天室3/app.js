//下载包   客户端=》 socket.io-client    服务器端=》koa-socket  用于将socket.io连接到koa实例

const Koa = require('koa');
const path = require('path');
const Router = require('koa-router');
const static = require('koa-static');
const session = require('koa-session');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser'); //body解析器


const group = {
    'male': '男生组',
    'female': '女生组'
};
// 全局变量  global
global.mySessionStore = {}; // 132313: {socketid:/#I4LARR47CSu5pd1EAAAB ,username}

// 根据 socketid 找 key
function findKeyBySocketId(socketid) {
    for (var key in global.mySessionStore) { //for in 遍历数组  key 是一个属性
        let obj = global.mySessionStore[key];
        if (obj.socketid === socketid) {
            return key;
        }
    }
}


// 根据 socketid 找 value
function findBySocketId(socketid) {
    for (var tempstamp in global.mySessionStore) { //for in 遍历数组
        let obj = global.mySessionStore[tempstamp];
        if (obj.socketid === socketid) {
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
    console.log('当前消息的socketid', context.socket.socket.id);
    // 在这里没有ctx.session 所以我们得想办法在这里拿到当前用户的

    // 查找对象的用户
    let obj = findBySocketId(context.socket.socket.id)

    // 广播给所有人
    io.broadcast('allmessage', obj.username + '对所有人说:' + context.data.newContent);

})
// 处理登录同步信息
io.on('login', context => {
    let id = context.data.id;
    // console.log(context.data.id);
    // console.log(context.socket.socket.id);
    global.mySessionStore[id].socketid = context.socket.socket.id

    // 测试用户上线
    io.broadcast('online', {
        online: global.mySessionStore
    })
    // console.log('一个用户上线了');
    context.socket.on('disconnect', (context) => {
        // console.log(msg);
        // console.log('一个用户退出了')
        // 删除原本存在的id用户   获取socketid
        let socketid = context.socket.socket.id;
        let key = findKeyBySocketId(socketid);
        // 删除key
        delete global.mySessionStore[key];

        io.broadcast('online', {
            online: global.mySessionStore
        });

    })

});
// 发起私聊
io.on('sendPrivateMsg', context => {
    // socketid to msg
    let {msg} = context.data;
    let toId = context.data.to;
    let fromSocketId = context.socket.socket.id;
    let {username} = findBySocketId(fromSocketId); //解构赋值
    // xxx  对你私聊说  ：  xxx
    // koa-socket  是一个socket.io的语法糖   app._io  就是io对象
    app._io.to(toId).emit('allmessage', `${username}对你说：${msg}`);
});
// 加入组
io.on('jounGroup', context => {
    let groupId = context.data;
    console.log(context.data); //点击男生组就是male  点击女生组就是 female
    // 使用当前 socket加入组
    context.socket.socket.join(groupId);
    console.log('加入' + groupId);
})
// 组聊天
io.on('sendGroupMsg', context => {
    let {groupTo,msg} = context.data;
    let fromSocketId = context.socket.socket.id;
    let {username} = findBySocketId(fromSocketId);
    // koa-socket  是一个socket.io的语法糖   app._io  就是io对象
    app._io.to(groupTo).emit('allmessage', `
    来自${group[groupTo]} 的 ${username} 对大家说：${msg}
`);
})





// 加入 socket.io 结束



render(app, {
    // 页面查找的目录
    root: path.join(__dirname, 'view'), //join 当前目录加view
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
            // msgs
        });
    })

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
app.use(static(path.resolve('./public'))); //resolve 转换为绝对路径
app.use(session({
    store
}, app, ));
// 处理请求体数据    （在路由之前
app.use(bodyParser()); //body解析器
app.use(router.routes()); // 路由

// 处理405 501 
app.use(router.allowedMethods());

app.listen(4444, () => {
    console.log('4444')
})