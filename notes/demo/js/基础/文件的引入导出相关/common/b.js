let say = require('./a')

// commonJS 传递的值是一个拷贝 在其他模块的改变不会影响到 数据源
console.log(say.age);

say.setAge()

console.log(say.getName())


console.log(say.age)