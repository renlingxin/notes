new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('第一步');
        resolve('第一步完成')
    }, 1000);
}).then(res => {
    console.log(res);// 输出  第一步完成
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('第二步');
            
            reject('第二步失败')
        }, 1000);
    })
}).then(res => {
    console.log(res);//不会输出
}).catch((res) => {
    console.log(res); // 输出 第二步失败 
})