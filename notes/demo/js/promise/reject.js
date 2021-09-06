function fn() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './user',

            success(res) {
                // 成功获得数据，把数据暴露给外界
                resolve(res);
            },
            error(resError) {
                // 失败  把错误暴露给外界
                reject(resError);
            }

        })
    })
}
// 第一种处理错误的方式
fn().then(res => {
    // 表示成功

}, resError => {
    // 表示失败
    console.log(resError);
});
// 第二种处理错误的方式
fn().then(res => {
    // 表示成功
}).catch(resError => {
    // 表示失败
    console.log(resError);
});

// 第二种处理错误的方式更推荐
//   1 不仅仅可以捕获reject中的错误
//   2 还可以捕获成功代码中的错误