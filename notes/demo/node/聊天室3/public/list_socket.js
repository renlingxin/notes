// socket.io-client     socket.io 客户端
var ren =document.getElementById('ren').value;
var socket = io('http://localhost:4444'); //地址

socket.on('connect', function () {
    console.log('连接上了');
    // 登录  同步前后端信息
    socket.emit('login', {
        id: ren//后端渲染代码出来的   ｛｛｝｝是嵌套的对象或程序段
    });
});
//   代表服务器那边的emit('msg1，data')
socket.on('msg1', function (data) {
    console.log(data)
});
socket.on('disconnect', function () {
    console.log('断开连接了');
});
// 获取实时的在线列表信息
socket.on('online', function (data) {
    //  data 是一个 session{121212:{username:ccc,socketid:xxx}},{121212:{username:ccc,socketid:xxx}}
    // 将该对象转换成数组
    var users = Object.values(data.online);
    console.log(users);
    // 展示在线人数
    document.getElementById('online').innerHTML = users.length;

    // 做一个select 来做一个在线列表
    var select = document.getElementById('twoho');
    var html;
    for (var i = users.length - 1; i >= 0; i--) {
        var u = users[i];
        console.log(u);
        html += `
        <option value="${u.socketid}">${u.username}</option>
        `
    }
    // 插入数据
    select.innerHTML = html;
}); 
socket.on('allmessage', function (data) {
    console.log(data);
    var ul =document.getElementById('ul');
    ul.innerHTML = data;
})