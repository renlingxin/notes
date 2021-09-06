// 81. 搜索旋转排序数组 II
// 已知存在一个按非降序排列的整数数组 nums ，数组中的值不必互不相同。

// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转 ，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,4,4,5,6,6,7] 在下标 5 处经旋转后可能变为 [4,5,6,6,7,0,1,2,4,4] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。如果 nums 中存在这个目标值 target ，则返回 true ，否则返回 false 。

 

// 示例 1：

// 输入：nums = [2,5,6,0,0,1,2], target = 0
// 输出：true

// 菜鸡写法 ---- 一层遍历
var search = function(nums, target) {
    return nums.indexOf(target)  !== -1
};

// 官方题解 ---- 二分法 -- 从中间劈开分开去找
var search1 = function(nums, target) {
    // 这里都是条件判断
    const n = nums.length;
    if (n === 0) {
        return false;
    }
    if (n === 1) {
        return nums[0] === target;
    }
// [2,5,6,0,0,1,2]
//  0,1,2,3,4,5,6  n= 7
    let l = 0, r = n - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) {
            return true;
        }
        if (nums[l] === nums[mid] && nums[mid] === nums[r]) {
            // 对于数组中有重复元素的情况，二分查找时可能会有 a[l]=a[\textit{mid}]=a[r]a[l]=a[mid]=a[r]，此时无法判断区间 [l,\textit{mid}][l,mid] 和区间 [\textit{mid}+1,r][mid+1,r] 哪个是有序的。
            // 例如 \textit{nums}=[3,1,2,3,3,3,3]nums=[3,1,2,3,3,3,3]，\textit{target}=2target=2，首次二分时无法判断区间 [0,3][0,3] 和区间 [4,6][4,6] 哪个是有序的。
            // 对于这种情况，我们只能将当前二分区间的左边界加一，右边界减一，然后在新区间上继续二分查找。
            ++l;
            --r;
        } else if (nums[l] <= nums[mid]) {
            // 在这里去 找区间
            if (nums[l] <= target && target < nums[mid]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[n - 1]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
    }
    return false;
};
console.log(search1([2,5,6,0,0,1,2]));

// 179. 最大数
// 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。

// 注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。

 

// 示例 1：

// 输入：nums = [10,2]
// 输出："210"
// 示例 2：

// 输入：nums = [3,30,34,5,9]
// 输出："9534330"


// 官方答案 太难了
var largestNumber = function(nums) {
    nums.sort((x, y) => {
        let sx = 10, sy = 10;
        while (sx <= x) {
            sx *= 10;
        }
        while (sy <= y) {
            sy *= 10;
        }
        console.log('' + (sx * y + x) , ('' + (sy * x + y)));
        return '' + (sx * y + x) - ('' + (sy * x + y));
    })
    console.log(nums);
    if (nums[0] === 0) {
        return '0';
    }
    return nums.join('');
};
console.log(largestNumber([3,30,34,5,9]));


// 27. 移除元素
// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

// 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
// 示例 1：

// 输入：nums = [3,2,2,3], val = 3
// 输出：2, nums = [2,2]
// 解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。

var removeElement = function(nums, val) {
    // p1 用来记录不等于val的值 p2 用来 0-length的遍历
    // 目的是在计算结果的同时 改变原数组
    let p1 = 0
    let p2 = 0
    while(p2 <= nums.length-1){
        if(nums[p2] !== val){
            nums[p1] = nums[p2]
            p1++
        }
        ++p2
    }
    return p1
};
console.log('resres',removeElement([3,2,2,3],3));


// 官方1 和上面的类似
var removeElement1 = function(nums, val) {
    const n = nums.length;
    let left = 0;
    for (let right = 0; right < n; right++) {
        if (nums[right] !== val) {
            nums[left] = nums[right];
            left++;
        }
    }
    return left;
};
console.log('resres',removeElement1([3,2,2,3],3));
// 上面两种方法存在的问题：
// 如果要移除的元素恰好在数组的开头，例如序列 [1,2,3,4,5][1,2,3,4,5]，
// 当 \textit{val}val 为 11 时，我们需要把每一个元素都左移一位。注意到题目中说：「元素的顺序可以改变」。
// 实际上我们可以直接将最后一个元素 55 移动到序列开头，取代元素 11，得到序列 [5,2,3,4][5,2,3,4]，
// 同样满足题目要求。这个优化在序列中 \textit{val}val 元素的数量较少时非常有效。
// 实现方面，我们依然使用双指针，两个指针初始时分别位于数组的首尾，向中间移动遍历该序列


// 官方双指针优化 （理解是倒着遍历下）
var removeElement2 = function(nums, val) {
    let left = 0, right = nums.length;
    while (left < right) {
        if (nums[left] === val) {
            nums[left] = nums[right - 1];
            right--;
        } else {
            left++;
        }
    }
    return left;
};
console.log('resres',removeElement2([3,2,2,3],3));
// 这样的方法两个指针在最坏的情况下合起来只遍历了数组一次。与方法一不同的是，方法二避免了需要保留的元素的重复赋值操作。

// 28. 实现 strStr()
// 实现 strStr() 函数。
// 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。
// 说明：
// 当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。
// 对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符。

// 官方题解1 暴力匹配
var strStr = function(haystack, needle) {
    const n = haystack.length, m = needle.length;
    for (let i = 0; i + m <= n; i++) {
        let flag = true;
        for (let j = 0; j < m; j++) {
            if (haystack[i + j] != needle[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            return i;
        }
    }
    return -1;
};

console.log('strStrstrStr',strStr("mississippi","issip"));


// 1720. 解码异或后的数组
// 未知 整数数组 arr 由 n 个非负整数组成。

// 经编码后变为长度为 n - 1 的另一个整数数组 encoded ，其中 encoded[i] = arr[i] XOR arr[i + 1] 。例如，arr = [1,0,2,1] 经编码后得到 encoded = [1,2,3] 。

// 给你编码后的数组 encoded 和原数组 arr 的第一个元素 first（arr[0]）。

// 请解码返回原数组 arr 。可以证明答案存在并且是唯一的。


// a^b=c  a^c=b b^c=a  异或规律

var decode = function(encoded, first) {
    const n = encoded.length + 1;
    const arr = new Array(n).fill(0);
    arr[0] = first;
    for (let i = 1; i < n; i++) {
        arr[i] = arr[i - 1] ^ encoded[i - 1];
    }
    return arr;
};
console.log('decode',decode([1,2,3],1));console.log('decode22',decode([6,2,7,3],4));

// 1486. 数组异或操作
// 给你两个整数，n 和 start 。
// 数组 nums 定义为：nums[i] = start + 2*i（下标从 0 开始）且 n == nums.length 。
// 请返回 nums 中所有元素按位异或（XOR）后得到的结果。

// 示例 1：
// 输入：n = 5, start = 0
// 输出：8
// 解释：数组 nums 为 [0, 2, 4, 6, 8]，其中 (0 ^ 2 ^ 4 ^ 6 ^ 8) = 8 。
//      "^" 为按位异或 XOR 运算符。
var xorOperation = function(n, start) {
    let _res = null
    for(let i=0;i<n;i++){
        _res = start + 2 * i  ^ _res
    }
    return _res
};
console.log('xorOperation',xorOperation(1,7))

// 知识点
// 1. 按位与 （二进制位上都为1时取1 否则取0）&

// 2. 按位或 （二进制位上都为0时取0 否则取1）|

// 3. 按位异或 （二进制位上比较两个的结果不一样取1 否则取0）
//    a^b=c  a^c=b b^c=a  异或规律

// 4. 十进制和二进制之间的互相转换

//     十进制转二进制
let _B = 10
console.log('22222进制',_B.toString(2)) // 入参代表要转成几进制的

//     二进制转十进制
let _e = 1010111
console.log('10进制',parseInt(_e,2)) //这个的第二个参数表示把前面的值当做2进制的来转



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

    return t.toString() === y.toString() //数组比较是否相等
    // const max = Math.max(t.length,y.length)
    // for(let i =0;i<max;++i) {
    //     if(t[i]!==y[i]){
    //         return false
    //     }
    // }
    // return true
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


// 12. 整数转罗马数字
// 罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。

// 字符          数值
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
// 例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

// 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

// I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
// X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
// C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
// 给你一个整数，将其转为罗马数字。


// 这个解题有规律   --- 官方的

// CM => 900  
// CD => 400
// XL => 50
// XC => 90
// IV => 4
// IX => 9

// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000

// 思路
// 根据罗马数字的唯一表示法，为了表示一个给定的整数 \textit{num}num，我们寻找不超过 \textit{num}num 的最大符号值，将 \textit{num}num 减去该符号值，然后继续寻找不超过 \textit{num}num 的最大符号值，将该符号拼接在上一个找到的符号之后，循环直至 \textit{num}num 为 00。最后得到的字符串即为 \textit{num}num 的罗马数字表示。
// 编程时，可以建立一个数值-符号对的列表 \textit{valueSymbols}valueSymbols，按数值从大到小排列。遍历 \textit{valueSymbols}valueSymbols 中的每个数值-符号对，若当前数值 \textit{value}value 不超过 \textit{num}num，则从 \textit{num}num 中不断减去 \textit{value}value，直至 \textit{num}num 小于 \textit{value}value，然后遍历下一个数值-符号对。若遍历中 \textit{num}num 为 00 则跳出循环。

var intToRoman = function(num) {
    const valueSymbols = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    const roman = [];
    for (const [value, symbol] of valueSymbols) {
        while (num >= value) {
            num -= value;
            roman.push(symbol);
        }
        if (num == 0) {
            break;
        }
    }
    return roman.join('');
};
console.log(intToRoman(34)) //XXXIV

// 461. 汉明距离
// 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。

// 给出两个整数 x 和 y，计算它们之间的汉明距离。

// 注意：
// 0 ≤ x, y < 231.

// 示例:

// 输入: x = 1, y = 4

// 输出: 2

// 解释:
// 1   (0 0 0 1)
// 4   (0 1 0 0)
//        ↑   ↑

// 上面的箭头指出了对应二进制位不同的位置。

// 用最笨的方法解出来
var hammingDistance = function(x, y) {
    let _x = x.toString(2);let _y = y.toString(2)
    let _n = Math.max(_x.length,_y.length)
    let _res = 0
    if(_x.length>_y.length){
        _y = _y.padStart(_x.length,'0')
    }
    if(_x.length<_y.length){
       _x = _x.padStart(_y.length,'0')
    }
    for(let i =_n-1;i>=0;i--){
        if(_x[i] !== _y[i]){
            _res++
        }
    }
    return _res
};
console.log(hammingDistance(1,4))

// 官方的
var hammingDistance1 = function(x, y) {
    let s = x ^ y, ret = 0;
    console.log(s)
    while (s != 0) {
        // 按位与
        s &= s - 1;
        ret++;
    }
    return ret;
};
console.log(hammingDistance1(1,4))




// 342. 4的幂
// 给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。
// 整数 n 是 4 的幂次方需满足：存在整数 x 使得 n == 4x


// 官方  有规律

// 思路与算法
// 如果 n 是 4 的幂，那么 n 一定也是 2 的幂。因此我们可以首先判断 n 是否是 2 的幂，在此基础上再判断 n 是否是 4 的幂。


// 如果 n 是 4 的幂，那么它可以表示成 4^x 的形式，我们可以发现它除以 3 的余数一定为1，即：
// 如果 n 是 2 的幂却不是 4 的幂，那么它可以表示成 4^x * 2 的形式，此时它除以 3 的余数一定为 2。
// 因此我们可以通过 n 除以 3 的余数是否为 1 来判断 nn 是否是 44 的幂。
var isPowerOfFour = function(n) { 
    // (n & (n - 1)) === 0  判断 n 是否是 2 的幂
    return n > 0 && (n & (n - 1)) === 0 && n % 3 === 1;
};