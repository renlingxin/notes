const fs = require('fs');
const path = require('path');

let inputPath = path.resolve(process.argv[2]);
console.log(inputPath);

let num1 = parseFloat(process.argv[2]);
let num2 = parseFloat(process.argv[3]);
let sum = num1 + num2;
console.log('正在计算中。。。')

setTimeout(() => {
    console.log(sum);
}, 2000)


