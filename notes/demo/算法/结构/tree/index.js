// 二叉查找树
function Node(data, left, right) {
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
            // 当前插入的数据 小于根 遍历左侧
            if (data < current.data) {
                // 左节点
                current = current.left;
                // 找到空节点  左侧代表到根了
                if (current === null) {
                    parent.left = n;
                    break;
                }
            } else {
                // 当前插入的数据 小于根 遍历右侧
                current = current.right;
                // 找到空节点  右侧代表到根了
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
        console.log(node.show() + '----inOrder')
        inOrder(node.right);
    }
}

// 先序遍历 => 根左右
function preOrder(node) {
    if (!(node === null)) {
        console.log(node.show() + '----preOrder')
        preOrder(node.left);
        preOrder(node.right);
    }
}


// 后序遍历  => 叶子节点左右
function postOrder(node) {
    if (!(node === null)) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.show() + '----postOrder')
    }
}



let tree = new BST();

tree.insert(2)
tree.insert(24)
tree.insert(13)
tree.insert(25)
tree.insert(9)
tree.insert(27)
tree.insert(4)

console.log('11111', JSON.stringify(tree.root, null, 2))
// 执行遍历
inOrder(tree.root)
console.log('--------------------------------')
preOrder(tree.root)
console.log('--------------------------------')
postOrder(tree.root)
console.log('--------------------------------')

// 二叉树 中序遍历
// 输入: [1,null,2,3]
//    1
//     \
//      2
//     /
//    3

// 输出: [1,3,2]

// 已知推未知 维护显式的栈
var inorderTraversal = function (root) {
    const res = [];
    const stk = [];
    while (root || stk.length) {
        // console.log('------', stk)
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
// 返回 中序遍历的结果
var inorderTraversals = function (root) {
    let res = []
    const fun = function (root) {
        if (!(root === null)) {
            fun(root.left);
            res.push(root.data)
            fun(root.right);
        }
    }
    fun(root)
    return res;
};

console.log('inorderTraversal', inorderTraversal(tree.root));

console.log('inorderTraversals', inorderTraversals(tree.root));

// 翻转二叉树
// 示例：
// 输入：
//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// 输出：
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

// 递归  在未知的情况下建立一种隐式的调用关系
var invertTree = function (root) {
    if (root === null) {
        return null;
    }
    const left = invertTree(root.left);
    const right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
};
console.log(invertTree(tree.root))


// 平衡二叉树
// 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

// 示例 2:
// 给定二叉树 [1,2,2,3,3,null,null,4,4]
//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false

// 方法1  递归
const isBalanced = (root) => {
    // 1. 设置结果集
    let result = true;
    // 3. 递归
    const recursion = (root) => {
        // 3.1 如果没有下一个节点了，返回 0
        if (!root) {
            return 0;
        }
        // 3.2 当前层 + 1
        const left = recursion(root.left) + 1;
        const right = recursion(root.right) + 1;
        // 3.3 比较两棵树的深度
        if (Math.abs(left - right) > 1) {
            result = false;
        }
        console.log('left', left, right)
        // 3.4 返回这棵树最深的深度
        return Math.max(left, right);
    };
    // 2. 递归这棵树
    recursion(root);

    // 4. 返回结果
    return result;
};
console.log('isBalanced', isBalanced(tree.root))

// 方法2  深度优先遍历

let isbalances = function (root) {
    if (!root) return true
    let left = dfs(root.left)
    let right = dfs(root.right)

    if (Math.abs(left - right) > 1) return false
    return isBalanced(root.left) && isBalanced(root.right)
    // 深度遍历 获取二级 之下的 最深层级
    function dfs(node) {
        if (!node) return 0
        return Math.max(dfs(node.left) + 1, dfs(node.right) + 1)
    }
}
console.log('isbalances', isbalances(tree.root))



// 获取 二叉树的深度
// 自己写的笨方法  深度优先遍历
var maxDepth = function (root) {
    if (!root) return 0
    let left = dfs(root.left)
    let right = dfs(root.right)

    function dfs(node) {
        if (!node) return 0
        return Math.max(dfs(node.left) + 1, dfs(node.right) + 1);
    }
    return Math.max(left + 1, right + 1);
};
console.log('maxDepth', maxDepth(tree.root))

// 直接递归   深度优先遍历
var maxDepth1 = function (root) {
    if (!root) return 0
    return Math.max(maxDepth1(root.left) + 1, maxDepth1(root.right) + 1);
};
console.log('maxDepth1', maxDepth1(tree.root))


//广度优先遍历

var maxDepth2 = function (root) {
    if (!root) {
        return 0;
    }
    // 1. 设置深度为 0
    let depth = 0;
    // 2. 每层遍历
    let bfs = [root];
    // 3. 逐层访问树
    while (bfs.length) {
        // 3.1 每次遍历，深度 + 1
        depth++;
        // 3.2 设置下一次需要遍历的节点
        const tempBfs = [];
        // 3.3 遍历本次所有节点，将有内容的都添加进来
        for (let i = 0; i < bfs.length; i++) {
            // 这么干的目的是为了把当前层级的根节点都循环一遍  横向的体现
            if (bfs[i].left) {
                tempBfs.push(bfs[i].left);
            }
            if (bfs[i].right) {
                tempBfs.push(bfs[i].right);
            }
        }
        // 3.4 交接 tempBfs 到 bfs 上
        bfs = tempBfs;
    }
    // 4. 返回深度
    return depth;
};
console.log('maxDepth2', maxDepth2(tree.root))


// 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。

//  

// 例如：

// 输入: 原始二叉搜索树:
//               5
//             /   \
//            2     13

// 输出: 转换为累加树:
//              18
//             /   \
//           20     13

const convertBST = (root) => {
    let sum = 0;

    const inOrder = (root) => {
        if (root == null) { // 遍历到null节点，开始返回
            return;
        }
        if (root.right) { // 先进入右子树
            inOrder(root.right);
        }

        sum += root.val; // 节点值累加给sum
        root.val = sum; // 累加的结果，赋给root.val

        if (root.left) { // 然后才进入左子树
            inOrder(root.left);
        }
    };

    inOrder(root); // 递归的入口，从根节点开始
    return root;
}



//  给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。
var getMinimumDifference = function (root) {
    let _res = []
    let _put = []
    const gets = function (root) {
        _res.push(root.val)
        if (root.left) {
            gets(root.left)
        }
        if (root.right) {
            gets(root.right)
        }
    }
    gets(root)
    // let temp = null
    for (let i = 0; i < _res.length; i++) {
        // temp = _res[i]
        let other = []
        for (let j = i + 1; j < _res.length; j++) {
            other.push(Math.abs(_res[i] - _res[j]))
        }
        _put.push(Math.min.apply(this, other))
    }
    console.log('_res',_res)
    console.log('_put',_put)
    return Math.min.apply(this, _put)
};

// 官方解法  中序遍历
var getMinimumDifference1 = function (root) {
    let ans = Number.MAX_SAFE_INTEGER,
        pre = -1;
    const dfs = (root) => {
        if (root === null) {
            return;
        }
        dfs(root.left);
        if (pre == -1) {
            pre = root.val;
        } else {
            ans = Math.min(ans, root.val - pre);
            pre = root.val;
        }
        dfs(root.right);
    }
    dfs(root);
    return ans;
};
// 872. 叶子相似的树
// 请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。
// 举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。

// 如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。

// 如果给定的两个根结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。
//  1        1
// 2 3      3 2   23和32不一样
var leafSimilar = function(root1, root2) {
    let arr = []
    let arr1= []
    let t = inOrder(root1,arr)
    let y = inOrder(root2,arr1)
    const max = Math.max(t.length,y.length)
    for(let i =0;i<max;++i) {
        if(t[i]!==y[i]){
            return false
        }
    }
    return true
};
function inOrder1(node,arr) {
    if (!(node === null)) {
        inOrder(node.left,arr);
        inOrder(node.right,arr);
        if(!node.left && !node.right){
            arr.push(node.val)
        }
        return arr
    }
}

// 863. 二叉树中所有距离为 K 的结点
// 给定一个二叉树（具有根结点 root）， 一个目标结点 target ，和一个整数值 K 。

// 返回到目标结点 target 距离为 K 的所有结点的值的列表。 答案可以以任何顺序返回。

// 示例 1：

// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
// 输出：[7,4,1]
// 解释：
// 所求结点为与目标结点（值为 5）距离为 2 的结点，
// 值分别为 7，4，以及 1
var distanceK = function(root, target, k) {
    const parents = new Map();
    const ans = [];

    const findParents = (node) => {
        if (node.left != null) {
            parents.set(node.left.val, node);
            findParents(node.left);
        }
        if (node.right != null) {
            parents.set(node.right.val, node);
            findParents(node.right);
        }
    }

    // 从 root 出发 DFS，记录每个结点的父结点
    findParents(root);
    // from 这里的作用是为了避免重复访问节点
    const findAns = (node, from, depth, k) => {
        if (node == null) {
            return;
        }
        if (depth === k) {
            ans.push(node.val);
            return;
        }
        // 向下-左  from 这里的作用是为了避免重复访问节点  比如在这里已经向上访问父节点了 在这里就会重复访问到当前节点
        if (node.left !== from) {
            findAns(node.left, node, depth + 1, k);
        }
        // 向下-右 from 这里的作用是为了避免重复访问节点  比如在这里已经向上访问父节点了 在这里就会重复访问到当前节点
        if (node.right !== from) {
            findAns(node.right, node, depth + 1, k);
        }
        // 向上-
        if (parents.get(node.val) !== from) {
            findAns(parents.get(node.val), node, depth + 1, k);
        }
    }
    // 从 target 出发 DFS，寻找所有深度为 k 的结点
    findAns(target, null, 0, k);

    return ans;
};
// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/all-nodes-distance-k-in-binary-tree/solution/er-cha-shu-zhong-suo-you-ju-chi-wei-k-de-qbla/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

