// 链表  

// 数组的缺点  =>  js中 数组被当作对象来实现，效率很低；除了随机访问 都可以使用链表，数组对于随机访问比较有优势

// 定义 => 链表是由一组节点组成，每个节点使用一个对象的引用指向他的后继，指向另一个节点的引用叫做 链 


// Node 类

function Node(element) {
    this.element = element
    this.next = null
}


class LinkedList {
    constructor() {
        this.head = new Node('head')
    }
    // 查找节点
    find(target) {
        let current = this.head
        while (current.element !== target) {
            // 查不到就返回最后一个
            if (!current.next) return current
            current = current.next
        }
        return current
    }
    // 插入
    insert(newEle, oldEle) {
        let newNode = new Node(newEle);
        let oldNode = this.find(oldEle)
        // console.log(oldNode)
        // 你可以注释了这行试试
        if (oldNode.next === null) {
            oldNode.next = newNode
            return
        }
        // 注释了之后把下面两行换个位置
        newNode.next = oldNode.next
        oldNode.next = newNode
    }
    // 显示链表中的元素
    display(target) {
        let current = target || this.head;
        while (current.element !== null) {
            console.log(current.element)
            if (!current.next) {
                return
            }
            current = current.next;
        }
    }
    // 查找当前元素的上一个节点
    findPrevious(target) {
        let current = this.head;
        while (current.next !== null && current.next !== target) {
            current = current.next
        }
        return current
    }
    // 删除节点
    remove(target) {
        let pre = findPrevious(target)
        if (pre.next !== null) {
            pre.next = pre.next.next
        }
    }
}

let t = new LinkedList()
t.insert(1, 'head')
t.insert(2, 1)
t.insert(5, 2)
// t.insert(5,3)
// t.display()

console.log(JSON.stringify(t, null, 2))


// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

// 1. 递归
// var swapPairs = function(head) {
//     if (head === null|| head.next === null) {
//         return head;
//     }
//     // 取第二个值
//     const newHead = head.next;
//     // 将第一组后面的 递归进行调换操作 
//     head.next = swapPairs(newHead.next);
//     // 调换位置
//     newHead.next = head;
//     return newHead;
// };

// let res = swapPairs(t.head)

// console.log(JSON.stringify(res,null,2))

// 2. 迭代方法
var swapPairs1 = function (head) {
    // 新建一个哑节点 为链表建立初始的链接关系 便于移动节点操作
    let res = new Node()
    res.next = head
    let temp = res
    while (temp.next !== null && temp.next.next !== null) {
        const node1 = temp.next
        const node2 = temp.next.next

        node1.next = node2.next
        node2.next = node1
        temp.next = node2

        temp = node1
    }
    return res.next
};

let res1 = swapPairs1(t.head)

console.log(JSON.stringify(res1, null, 2))

// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例：

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807

var addTwoNumbers = function (l1, l2) {
    let t = getVal(l1)
    let s = getVal(l2)
    console.log(Number(t), Number(s))
    return change(Number(t) + Number(s))
};
const getVal = (target) => {
    let _res = ''
    while (target !== null) {
        _res += target.val
        target = target.next
    }
    return _res.split('').reverse().join('')
}
const change = (val) => {
    //807
    val += ''
    let _len = val.length
    let _index = 0
    let list = null
    while (_index < _len) {
        let g = new ListNode(val[_index])
        if (!list) {
            list = g
        } else {
            g.next = list
            list = g
        }
        _index++
    }
    return list
}

// 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…=
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// 示例 1:
// 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
// 示例 2:
// 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.


// 自己写的笨方法
var reorderList = function (head) {
    const getval = (target) => {
        let arr = []
        while (target !== null) {
            arr.push(target.element)
            target = target.next
        }
        return arr
    }
    let old = getval(head)
    const getarr = (arr) => {
        let newarr = []
        let left = 0
        let right = arr.length - 1
        while (left <= right && newarr.length < arr.length) {
            newarr.push(arr[left])
            if (newarr.length < arr.length) {
                newarr.push(arr[right])
            }
            left++
            right--
        }
        return newarr
    }
    let newarr = getarr(old)

    const change = (target) => {
        let list = null
        for (let i = target.length - 1; i >= 0; i--) {
            let other = new Node(target[i])
            if (!list) {
                list = other
            } else {
                other.next = list
                list = other
            }
        }
        return list
    }
    let res1 = change(newarr)
    // return res1
    console.log(res1)
};
console.log('aaaa', reorderList(t.head))

// 力扣上 大神写的
var reorderList1 = function (head, s = [], tmp) {
    // 这里
    while (head) {
        tmp = head.next,
            head.next = null,
            s.push(head)
        head = tmp
    }
    // 示例
    [
        [1],
        [2],
        [3],
        [4],
        [5]
    ]
    // s[0].next = s[1]
    // s[1].next= s[3]
    // console.log(s)

    // 这里的 调换 用到了 双指针和耦合引用（就是对象的浅拷贝）
    var i = -1,
        j = s.length
    while (++i < --j) {
        s[i].next = s[j]
        j !== i + 1 && (s[j].next = s[i + 1])
    }
    // 结果
    [
        [1, 5, 2, 4, 3],
        [2, 4, 3],
        [3],
        [4, 3],
        [5, 2, 4, 3]
    ]
    return s[0]
};
