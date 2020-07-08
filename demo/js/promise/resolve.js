function getUser() {
    return new Promise(resolve => {
        // JQ 写的一个ajax
        $.get('./user', (res) => {
            // res 就是从服务器获得数据
            // 把数据传到下一步操作中
            // 告诉外界本次的异步操作已经完成了，并且把res暴露出去
            resolve(res);
        })
    })
}

getUser().then(res => {
// res就是上一个异步操作返回的参数值：从服务器上获得的数据
});