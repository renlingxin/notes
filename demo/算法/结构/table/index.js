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
            current = current.next
        }
        return current
    }
    // 插入
    insert(newEle, oldEle) {
        let newNode = new Node(newEle);
        let oldNode = this.find(oldEle)
        oldNode.next = newNode
        newNode.next = oldNode.next
    }
    // 显示链表中的元素
    display() {
        let current = this.head;
        while (current.element !== null) {
            console.log(current.element)
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