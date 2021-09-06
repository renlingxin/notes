import {
    age,
    editAge,
    init
} from './a.js'

init()

// es6 模块 之间传递的值 是一个引用 在其他模块中的数据操作 可能会影响到 数据源  另一种理解 他是可以动态的更新 模块中引用的数据
console.log(age)
editAge()
console.log(age)

// sayBaBa.init()
// console.log(sayBaBa.age)
// sayBaBa.editAge()
// console.log(sayBaBa.age)