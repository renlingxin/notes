
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


// 中序遍历  => 升序

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
        inOrder(node.left);
        inOrder(node.right);
    }
}



// 后序遍历  => 叶子节点左右

function postOrder(node) {
    if (!(node === null)) {
        inOrder(node.left);
        inOrder(node.right);
        console.log(node.show() + '')
    }
}


let tree = new BST();

tree.insert(23)
tree.insert(24)
tree.insert(13)
tree.insert(9)
tree.insert(4)

// inOrder(tree.root)
preOrder(tree.root)
// postOrder(tree.root)