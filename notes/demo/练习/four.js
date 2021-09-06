//环境变量
// console.log(process.env);

// let ren = process.env.MYTEXT;
// if (ren === 'renlingxin') {
//     console.log('是本人');
// } else {
//     console.log('不是本人');
// }
//命令行参数
// console.log(process.argv); 
// let num = process.argv[2] - 0;
// let num1 = parseInt(process.argv[3]) ;
// let sum = num + num1;
// console.log(num+'+'+num1+'正在计算中。。。');
// setTimeout(() => {
//     console.log('运算的结果是' + sum);
// },2000);

// console.log('=================');
// console.log(__dirname);//当前文件的绝对路径
// console.log('=================');
// console.log(__filename);//当前文件的目录，绝对路径
// console.log('=================');

const path = require('path');

const myPath = path.join(__dirname, '/one', '/two', '/three');//在当前路径后添加
console.log(myPath);

const str = './ren/ling/xin';
let temp = path.resolve(str);//将相对路径转换成绝对路径
console.log(temp);

let pathObj = path.parse(myPath);//将路径转换为一个对象
console.log(pathObj);

pathObj.base = 'one.txt';//改变当前文件名
console.log(pathObj);

let paths = path.format(pathObj);//将对象再次转换成字符串路径
console.log(paths);