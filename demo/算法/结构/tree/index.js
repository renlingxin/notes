
function Node(data,left,right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show() {
    return this.data;
}

function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
}

function insert(data) {
    let n = new Node(data, null, null)
    if (this.root === null) {
        this.root = n
    } else {
        var current = this.root;
        var parent;
        while (true) {
            parent = current;
            if (data < current.data) {
                // 左节点
                current = current.left;
                if (current === null) {
                    parent.left = n;
                    break;
                }
            } else {
                // 右节点
                current = current.right;
                if (current == null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
}

// 递归： 未知推已知 隐式的栈
// 时间复杂度 和 空间复杂度 O(n)
// 中序遍历  => 升序  左根右

function inOrder(node) {
    if (!(node === null)) {
        inOrder(node.left);
        console.log(node.show() + '')
        inOrder(node.right);
    }
}
// 先序遍历 => 根左右

function preOrder(node) {
    if (!(node === null)) {
        console.log(node.show() + '')
        preOrder(node.left);
        preOrder(node.right);
    }
}



// 后序遍历  => 叶子节点左右

function postOrder(node) {
    if (!(node === null)) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show() + '')
    }
}



// 已知推未知 维护显式的栈
var inorderTraversal = function(root) {
    const res = [];
    const stk = [];
    while (root || stk.length) {
        console.log('------', stk)
        while (root) {
            stk.push(root);
            root = root.left;
        }
        root = stk.pop();
        res.push(root.data);
        root = root.right;
    }
    return res;
};

let tree = new BST();

tree.insert(23)
tree.insert(24)
tree.insert(13)
tree.insert(9)
tree.insert(4)

inOrder(tree.root)
// preOrder(tree.root)
// postOrder(tree.root)

console.log(inorderTraversal(tree.root));