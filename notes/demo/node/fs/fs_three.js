const fs = require('fs');

console.log('同步读取前.....');
fs.readFileSync('./tim.txt');
console.log('工作A'); //会被同步读取堵住
console.log('同步读取成功了');


console.log('异步读取前.....');
fs.readFile('./tim.txt', () => {
    console.log('异步读取成功了');
});
console.log('工作A'); //先输出工作A再输出读取成功 异步读取