// 1846. 减小和重新排列数组后的最大元素
// 给你一个正整数数组 arr 。请你对 arr 执行一些操作（也可以不进行任何操作），使得数组满足以下条件：

// arr 中 第一个 元素必须为 1 。
// 任意相邻两个元素的差的绝对值 小于等于 1 ，也就是说，对于任意的 1 <= i < arr.length （数组下标从 0 开始），都满足 abs(arr[i] - arr[i - 1]) <= 1 。abs(x) 为 x 的绝对值。
// 你可以执行以下 2 种操作任意次：

// 减小 arr 中任意元素的值，使其变为一个 更小的正整数 。
// 重新排列 arr 中的元素，你可以以任意顺序重新排列。
// 请你返回执行以上操作后，在满足前文所述的条件下，arr 中可能的 最大值 。

// 示例 1：

// 输入：arr = [2,2,1,2,1]
// 输出：2
// 解释：
// 我们可以重新排列 arr 得到 [1,2,2,2,1] ，该数组满足所有条件。
// arr 中最大元素为 2 。
var maximumElementAfterDecrementingAndRearranging = function (arr) {
    let _sort = arr.sort((a, b) => a - b)
    _sort[0] = 1
    if (_sort.length <= 1) return Math.max.apply(this, _sort)
    for (let i = 1; i < _sort.length; i++) {
        let _res = Math.abs(_sort[i] - _sort[i - 1]) <= 1
        if (!_res) _sort[i] = _sort[i - 1] + 1
    }
    return Math.max.apply(this, _sort)
};


// 剑指 Offer 53 - I. 在排序数组中查找数字 I
// 统计一个数字在排序数组中出现的次数。

// 示例 1:

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2

// 两分法
const binarySearch = (nums, target, lower) => {
    let left = 0,
        right = nums.length - 1,
        ans = nums.length;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1;
            ans = mid;
        } else {
            left = mid + 1;
        }
    }
    return ans;
}

var search = function (nums, target) {
    let ans = 0;
    const leftIdx = binarySearch(nums, target, true);
    const rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        ans = rightIdx - leftIdx + 1;
    }
    return ans;
};


// 遍历
var search = function (nums, target) {
    let _res = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            _res++
        }
    }
    return _res
};

// 1877. 数组中最大数对和的最小值
// 一个数对 (a,b) 的 数对和 等于 a + b 。最大数对和 是一个数对数组中最大的 数对和 。

// 比方说，如果我们有数对 (1,5) ，(2,3) 和 (4,4)，最大数对和 为 max(1+5, 2+3, 4+4) = max(6, 5, 8) = 8 。
// 给你一个长度为 偶数 n 的数组 nums ，请你将 nums 中的元素分成 n / 2 个数对，使得：

// nums 中每个元素 恰好 在 一个 数对中，且
// 最大数对和 的值 最小 。
// 请你在最优数对划分的方案下，返回最小的 最大数对和 。
// 示例 1：

// 输入：nums = [3,5,2,3]
// 输出：7
// 解释：数组中的元素可以分为数对 (3,3) 和 (5,2) 。
// 最大数对和为 max(3+3, 5+2) = max(6, 7) = 7 。
var minPairSum = function (nums) {
    let _sort = nums.sort((a, b) => a - b)
    let _res = 0
    for (let i = 0; i < _sort.length; i++) {
        _res = Math.max(nums[i] + nums[_sort.length - i - 1], _res)
    }
    return _res
};
console.log(minPairSum([3, 5, 2, 3]))


// 1893. 检查是否区域内所有整数都被覆盖
// 给你一个二维整数数组 ranges 和两个整数 left 和 right 。每个 ranges[i] = [starti, endi] 表示一个从 starti 到 endi 的 闭区间 。

// 如果闭区间 [left, right] 内每个整数都被 ranges 中 至少一个 区间覆盖，那么请你返回 true ，否则返回 false 。

// 已知区间 ranges[i] = [starti, endi] ，如果整数 x 满足 starti <= x <= endi ，那么我们称整数x 被覆盖了。



// 示例 1：

// 输入：ranges = [[1,2],[3,4],[5,6]], left = 2, right = 5
// 输出：true
// 解释：2 到 5 的每个整数都被覆盖了：
// - 2 被第一个区间覆盖。
// - 3 和 4 被第二个区间覆盖。
// - 5 被第三个区间覆盖。
var isCovered = function (ranges, left, right) {
    let _res = 0
    for (let i = left; i <= right; i++) {
        let j = 0
        while (j < ranges.length) {
            if (i >= ranges[j][0] && i <= ranges[j][1]) {
                _res += 1
                break
            }
            j++
        }
    }
    if (_res === 0) return false
    if (_res == right - left + 1) {
        return true
    } else {
        return false
    }
};

// 671. 二叉树中第二小的节点
// 给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为 2 或 0。如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个。

// 更正式地说，root.val = min(root.left.val, root.right.val) 总成立。

// 给出这样的一个二叉树，你需要输出所有节点中的第二小的值。如果第二小的值不存在的话，输出 -1 。



// 示例 1：


// 输入：root = [2,2,5,null,null,5,7]
// 输出：5
// 解释：最小的值是 2 ，第二小的值是 5 。
var findSecondMinimumValue = function (root) {
    let _arr = []
    _time(root, _arr)
    _arr.sort((a, b) => a - b)
    let _min = _arr[0]
    for (let i = 0; i < _arr.length; i++) {
        if (_arr[i] > _min) {
            return _arr[i]
        }
    }
    return -1
};

const _time = function (node, _arr) {
    if (node === null) return
    _arr.push(node.val)
    _time(node.left, _arr)
    _time(node.right, _arr)
}
// console.log('findSecondMinimumValue',findSecondMinimumValue([2,2,5,null,null,5,7]))


// 官方  理解题意很重要
var findSecondMinimumValue = function (root) {
    let ans = -1;
    const rootvalue = root.val;

    const dfs = (node) => {
        if (node === null) {
            return;
        }
        // 这一步是关键
        if (ans !== -1 && node.val >= ans) {
            return;
        }
        if (node.val > rootvalue) {
            ans = node.val;
        }
        dfs(node.left);
        dfs(node.right);
    }

    dfs(root);
    return ans;
};

// 规律题
// 292. Nim 游戏
// 你和你的朋友，两个人一起玩 Nim 游戏：

// 桌子上有一堆石头。
// 你们轮流进行自己的回合，你作为先手。
// 每一回合，轮到的人拿掉 1 - 3 块石头。
// 拿掉最后一块石头的人就是获胜者。
// 假设你们每一步都是最优解。请编写一个函数，来判断你是否可以在给定石头数量为 n 的情况下赢得游戏。如果可以赢，返回 true；否则，返回 false 。

// 官方的题解 有一个规律是重点 当某个人手里只剩4个的时候那么 无论那几个对方都会赢 所以如果想赢的话一定要避免4个的场景 因此在先手的情况下4的倍数 都是不行的
var canWinNim = function (n) {
    return n % 4
};
console.log(canWinNim(8), 'canWinNim')

console.log(45 % 3, 3 * 3 * 3 * 3)


// 326. 3的幂
// 给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 。

// 整数 n 是 3 的幂次方需满足：存在整数 x 使得 n == 3x

// 官方题解 思路 - 试除法 - 也就是 =把n一直整除3 
var isPowerOfThree = function (n) {
    if (n == 1) {
        return true
    }
    if (n < 3) {
        return false
    }
    if (n / 3 == 3) {
        return true
    } else {
        return isPowerOfThree(n / 3)
    }
};
console.log(isPowerOfThree(45), 'isPowerOfThree')
var isPowerOfThree1 = function (n) {
    while (n !== 0 && n % 3 !== 0) {
        n = Math.floor(n / 3)
    }
    return n === 1
};
console.log(isPowerOfThree1(45), 'isPowerOfThree11')

// 187. 重复的DNA序列
// 所有 DNA 都由一系列缩写为 'A'，'C'，'G' 和 'T' 的核苷酸组成，例如："ACGAATTCCG"。在研究 DNA 时，识别 DNA 中的重复序列有时会对研究非常有帮助。
// 编写一个函数来找出所有目标子串，目标子串的长度为 10，且在 DNA 字符串 s 中出现次数超过一次。
// 示例 1：
// 输入：s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
// 输出：["AAAAACCCCC","CCCCCAAAAA"]
// 示例 2：
// 输入：s = "AAAAAAAAAAAAA"
// 输出：["AAAAAAAAAA"]

// 原始方法  列出所有的子字符串 然后遍历其中符合条件的字符串
var findRepeatedDnaSequences = function (s) {
    if (s.length < 10) {
        return []
    }
    let _rud = []
    for (let i = 0; i <= s.length - 10; i++) {
        _rud.push(s.slice(i, i + 10))
    }
    let j = 0
    let _res = []
    let g = {}
    while (j < _rud.length) {
        if (g[_rud[j]] !== undefined && !_res.includes(_rud[j])) {
            g[_rud[j]] += 1
            _res.push(_rud[j])
        } else {
            g[_rud[j]] = 1
        }
        j++
    }
    return _res
};
console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"), 'findRepeatedDnaSequences')

// 476. 数字的补数
// 对整数的二进制表示取反（0 变 1 ，1 变 0）后，再转换为十进制表示，可以得到这个整数的补数。

// 例如，整数 5 的二进制表示是 "101" ，取反后得到 "010" ，再转回十进制表示得到补数 2 。
// 给你一个整数 num ，输出它的补数。
// 示例 1：
// 输入：num = 5
// 输出：2
// 解释：5 的二进制表示为 101（没有前导零位），其补数为 010。所以你需要输出 2 。
var findComplement = function (num) {
    let t = num.toString(2)
    let _res = ''
    for (let i = 0; i < t.length; i++) {
        if (t[i] == '1') {
            _res += '0'
        } else {
            _res += '1'
        }
    }
    return parseInt(_res, 2)
};
console.log(findComplement(5), 'findComplementfindComplement')

// 453. 最小操作次数使数组元素相等
// 给你一个长度为 n 的整数数组，每次操作将会使 n - 1 个元素增加 1 。返回让数组所有元素相等的最小操作次数。


// 示例 1：

// 输入：nums = [1,2,3]
// 输出：3
// 解释：
// 只需要3次操作（注意每次操作会增加两个元素的值）：
// [1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]

// 官方题解 --- 首先不需要计算使得数组中相等的那个值. 而是比较元素的相对大小 因此向上或者向下是一样的 向上的话并不容易计算出临界值 向下的临界值会是数组中最小的元素
// 计算每一个元素到最小元素之间距离的和 即是总共的操作次数
var minMoves = function (nums) {
    let min = Math.min(...nums)
    let res = 0
    for (let i = 0; i < nums.length; i++) {
        res += (nums[i] - min)
    }
    return res
};
console.log('minMoves', minMoves([1, 2, 3]))


// 66. 加一
// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。


// 示例 1：

// 输入：digits = [1,2,3]
// 输出：[1,2,4]
// 解释：输入数组表示数字 123。


var plusOne = function (digits) {
    let n = digits.length - 1
    for (let i = n; i >= 0; i--) {
        // 不为9的时候递增 --- 并且代表叠加结束
        if (digits[i] != 9) {
            digits[i]++
            return digits
        }
        // 为9时 赋值0
        digits[i] = 0
    }
    // 如果走到了这边 说明都是9 例如 【9】 其结果就是 【1，0】
    let temp = new Array(digits.length + 1).fill(0)
    temp[0] = 1
    return temp

};
console.log('plusOne', plusOne([9]))

// 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。

// 请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。

// nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。

//  

// 示例 1:

// 输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
// 输出: [-1,3,-1]
// 解释:

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/next-greater-element-i
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 官方解法  单调栈（前置记录每一个元素的右侧第一个最大值） + 哈希表（记录映射关系  元素 ： 该元素Nums2右侧第一个最大值）

var nextGreaterElement = function(nums1, nums2) {
    const map = new Map()
    const stack = []
    for(let i=nums2.length-1;i>=0;i--){
        const res = nums2[i]
        while(stack.length && res>stack[stack.length-1]){
            stack.pop()
        }
        map.set(res, stack.length ? stack[stack.length-1] : -1)
        stack.push(res)
    }
    return nums1.map((item)=>{return map.get(item)})
};
console.log(nextGreaterElement([4,1,2],[1,3,4,2]),'nextGreaterElement()')

// 暴力解法
var nextGreaterElement1 = function(nums1, nums2) {
    let result = []
  for(let i=0;i<nums1.length;i++){
      let res = nums1[i]
      let j = 0
      while(nums2[j] !== res){
          j++
      }
      let tt = nums2[j]
      j++
      while(nums2[j] < tt ){
          j++
      }
      result.push(nums2[j] || -1)
  }
  return result
};

console.log(nextGreaterElement1([4,1,2],[1,3,4,2]),'nextGreaterElement111()')


// 技巧： 判断 n 是否是2的幂
// https://leetcode-cn.com/problems/power-of-two/solution/2de-mi-by-leetcode-solution-rny3/
let isPowerOfTwo = (n) =>{
    // 1. 第一种 n 是正整数且 n & (n-1) === 0 按位与
    // return n > 0 && (n & (n-1)) === 0
    // 2. 第二种方式 -n 的二进制表示是n的二进制表示每一位取反再加上1
    // return n > 0 && n & (-n) === n
}

// 367. 有效的完全平方数
// 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。

// 进阶：不要 使用任何内置的库函数，如  sqrt 。

 

// 示例 1：

// 输入：num = 16
// 输出：true

// 使用内置函数 sqrt 开平方
var isPerfectSquare = function(num) {
    let n = Math.floor(Math.sqrt(num))
    return n*n === num
};
console.log(isPerfectSquare(16),'isPerfectSquare')

// 暴力计算 - 从1开始 计算是否有符合 x * x == num 的数字 如果 x * x > num 代表没有计算的意义了
var isPerfectSquare1 = function(num) {
    let x = 1;
    let res = 0
    while(res <= num){
        if(res === num){
            return true
        }
        res = x * x
        x++
    }
    return false
};
console.log(isPerfectSquare(1),'isPerfectSquare')