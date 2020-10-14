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
            if(!current.next) return current
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
        if(oldNode.next === null){
            oldNode.next =  newNode
            return
        }
        // 注释了之后把下面两行换个位置
        newNode.next = oldNode.next
        oldNode.next = newNode
    }
    // 显示链表中的元素
    display() {
        let current = this.head;
        while (current.element !== null) {
            console.log(current.element)
            if(!current.next){
                return
            }
            current = current.next;
        }
    }
    // 查找当前元素的上一个节点
    findPrevious(target){
        let current = this.head;
        while(current.next!== null && current.next !== target){
            current = current.next
        }
        return current
    }
    // 删除节点
    remove(target){
       let pre = findPrevious(target)
       if(pre.next !== null){
           pre.next = pre.next.next
       }
    }
}

let t = new LinkedList()
t.insert(1,'head')
t.insert(2,1)
t.insert(5,1)
// t.insert(5,3)
// t.display()

console.log(t)


// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};
let res = swapPairs(t.head)
// t.display()
console.log(JSON.stringify(res))