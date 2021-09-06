// #### 链式调用

// 1. 链式调用中，只有前一个 then 的回调执行完毕后，跟着的 then 中的回调才会被加入至微任务队列。

Promise.resolve()
    .then(() => {
        console.log("then1");
        Promise.resolve().then(() => {
            console.log("then1-1");
        });
    })
    .then(() => {
        console.log("then2");
    });
// 输出顺序 => then1  then1-1 then2

// 2. 每个链式调用的开端会首先依次进入微任务队列

let p = Promise.resolve();

p.then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
        console.log("then1-1");
    });
}).then(() => {
    console.log("then1-2");
});

p.then(() => {
    console.log("then2");
});
// then1 then2 then1-1 then1-2

//   3. 同一个 Promise 的每个链式调用的开端会首先依次进入微任务队列
let p = Promise.resolve().then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
        console.log("then1-1");
    });
}).then(() => {
    console.log("then2");
});

p.then(() => {
    console.log("then3");
});
// then1 then1-1 then2 then3 当执行到then2的时候p是then2生成的，不是Promise.resolve生成的

// 4. 当链式 回调遇到 return 

Promise.resolve()
    .then(() => {
        console.log("then1");
        Promise.resolve()
            .then(() => {
                console.log("then1-1");
                return 1;  //return 对于外层代表着回调结束了
            })
            .then((res) => {
                console.log("then1-2", res);
            });
    })
    .then((res) => {
        console.log("then2", res);
    })
    .then(() => {
        console.log("then3");
    })
    .then(() => {
        console.log("then4");
    });
// then1 then1-1 then2,undefined then1-2,1 then3 then4 


Promise.resolve()
    .then(() => {
        console.log("then1");
        Promise.resolve()
            .then(() => {
                console.log("then1-1");
                return Promise.resolve();
            })
            .then(() => {
                console.log("then1-2");
            });
    })
    .then(() => {
        console.log("then2");
    })
    .then(() => {
        console.log("then3");
    })
    .then(() => {
        console.log("then4");
    });
// then1 then1-1 then2 then3 then4 then1-2