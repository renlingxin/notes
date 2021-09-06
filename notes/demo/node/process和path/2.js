console.log(process.argv); //process.argv  命令行参数

// 命令行加法计算器
// process.argv  => 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数

// 获取数组的2,3索引对应的元素
let num1 = process.argv[2] - 0;
let num2 = parseInt(process.argv[3]);
let sum = num1 + num2;
// 输出 （卡顿输出）（定时输出）
console.log((num1+'+'+num2)+'计算中.....');

// 2秒后输出
setTimeout(() => {
    console.log('结果为：' + sum);
}, 2000);