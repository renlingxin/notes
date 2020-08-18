// 列表
// 列表 是一组有序的数据 每个列表中的数据项称为 元素 ，在JS中 列表中的元素 可以是任意的数据类型 列表中保存多少元素 没有事先的限定 实际的使用时元素的数量 受到内存的限制

function list() {
    this.dataStore = []
    this.listSize = 0
    this.pos = 0
    this.size = size
    this.findIndex = findIndex
    this.add = add
    this.remove = remove
    this.show = show
    this.insert = insert
    this.clear = clear
    this.contains = contains

    // 遍历方法
    this.front = function () {
        this.pos = 0
    }
    this.end = function () {
        this.pos = this.dataStore.length - 1
    }
    this.prev = function () {
        --this.pos
    }
    this.next = function () {
        if (this.pos < this.dataStore.length) {
            ++this.pos
        }
    }
    this.moveTo = function (target) {
        this.pos = target
    }
    this.getElement = function () {
        return this.dataStore[this.pos]
    }
    this.getPos = function () {
        return this.pos
    }

}

// 显示长度
function size() {
    return this.listSize
}

// 显示 内容
function show() {
    return this.dataStore
}

// 添加元素
function add(element) {
    this.dataStore[this.listSize++] = element
}

// 查找对应元素的下标
function findIndex(element) {
    for (let i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] === element) {
            return i
        }
    }
    return -1
}

// 移除指定元素
function remove(element) {
    let _index = this.findIndex(element)
    if (_index !== -1) {
        this.dataStore.splice(_index, 1)
        return true
    }
    return false
}

// 在某元素后 插入元素
function insert(newVal, oldVal) {
    let _oldIndex = this.findIndex(oldVal)
    if (_oldIndex !== -1) {
        this.dataStore.splice(_oldIndex + 1, 0, newVal)
        this.listSize++
        return true
    }
    return false
}

// 清空
function clear() {
    this.dataStore.length = 0
    this.listSize = 0
    return !this.dataStore.length
}

// 是否属于当前列表
function contains(element) {
    for (let i = 0; i <= this.dataStore.length; i++) {
        if (this.dataStore[i] === element) {
            return true
        }
    }
    return false
}


// 下面的是遍历方法






let l1 = new list();

l1.add('1111')
l1.add(222)

console.log(l1.show(), l1.contains(22), l1.insert('新插入', '1111'), l1.remove('1111'))
console.log(l1.size())

// 遍历
l1.next()
l1.moveTo(0)
console.log(l1.getElement(), l1.getPos())

// let rs = ['上京', '非上京', '11']

// let _isShow = {
//     _is1: rs.includes('上京'),
//     _is2: rs.includes('非上京')
// }
// if (_isShow._is1) {
//     // do something
//     console.log(111)
// }
// if (_isShow._is2) {
//     // do something
//     console.log(222)
// }

// let data = {
//     _is1: rs.includes('上京'),
//     _is2: rs.includes('非上京')
// }
// console.log(data)