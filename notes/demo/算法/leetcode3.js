
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
    let left = 0, right = nums.length - 1, ans = nums.length;
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
// console.log('findSecondMinimumValue', findSecondMinimumValue([2, 2, 5, null, null, 5, 7]))


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


// 413. 等差数列划分
// 如果一个数列 至少有三个元素 ，并且任意两个相邻元素之差相同，则称该数列为等差数列。

// 例如，[1,3,5,7,9]、[7,7,7,7] 和 [3,-1,-5,-9] 都是等差数列。
// 给你一个整数数组 nums ，返回数组 nums 中所有为等差数组的 子数组 个数。
// 子数组 是数组中的一个连续序列。
// 示例 1：

// 输入：nums = [1,2,3,4]
// 输出：3
// 解释：nums 中有三个子等差数组：[1, 2, 3]、[2, 3, 4] 和 [1,2,3,4] 自身。

var numberOfArithmeticSlices = function (nums) {
    let n = nums.length
    if (n === 1) return 0
    let left = 2
    let ans = nums[0] - nums[1]
    let _res = 0
    let g = 0
    while (left <= n) {
        let t = nums[left - 1] - nums[left]
        if (ans == t) {
            _res++
        } else if (t !== ans) {
            ans = t
            _res = 0
        }
        left++
        g += _res
    }
    return g
};

// 797. 所有可能的路径
// 给你一个有 n 个节点的 有向无环图（DAG），请你找出所有从节点 0 到节点 n-1 的路径并输出（不要求按特定顺序）

// 二维数组的第 i 个数组中的单元都表示有向图中 i 号节点所能到达的下一些节点，空就是没有下一个结点了。

// 译者注：有向图是有方向的，即规定了 a→b 你就不能从 b→a 。

// 示例 1：

// 输入：graph = [[1,2],[3],[3],[]]
// 输出：[[0,1,3],[0,2,3]]
// 解释：有两条路径 0 -> 1 -> 3 和 0 -> 2 -> 3

// 官方解法 -- 递归
let allPathsSourceTarget = (target) => {
    let stack = []
    let _res = []
    let n = target.length - 1

    function dfs(x,target,n){
        if (x===n) {
            _res.push(stack.slice())
            return
        }
        for (t of target[x]) {
            stack.push(t)
            dfs(t,target,n)
            stack.pop()
        }
    }
    stack.push(0)
    dfs(0,target,n)
    return _res
}
let t = [[1,2],[3],[3],[]]
console.log(allPathsSourceTarget(t),'allPathsSourceTargetallPathsSourceTarget')

// 53. 最大子序和
// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例 1：

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
var maxSubArray = function(nums) {
    let max = nums[0]
    for(let i=0;i<nums.length;i++) {
        let ans = nums[i]
        if(ans > max){
            max = ans
        }
        let j = i+1
        while(j<nums.length){
            ans+=nums[j]
            if(ans > max){
                max = ans
            }
            j++
        }
    }
    return max
};
console.log('maxSubArray',maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))

// 官方题解

var maxSubArray = function(nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/maximum-subarray/solution/zui-da-zi-xu-he-by-leetcode-solution/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// 1109. 航班预订统计
// 这里有 n 个航班，它们分别从 1 到 n 进行编号。

// 有一份航班预订表 bookings ，表中第 i 条预订记录 bookings[i] = [firsti, lasti, seatsi] 意味着在从 firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。

// 请你返回一个长度为 n 的数组 answer，其中 answer[i] 是航班 i 上预订的座位总数。

// 示例 1：

// 输入：bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
// 输出：[10,55,45,25,25]
// 解释：
// 航班编号        1   2   3   4   5
// 预订记录 1 ：   10  10
// 预订记录 2 ：       20  20
// 预订记录 3 ：       25  25  25  25
// 总座位数：      10  55  45  25  25
// 因此，answer = [10,55,45,25,25]

// 会超时
var corpFlightBookings = function(bookings, n) {
    let res = []
    let y = 0
    for(let i=1;i<=n;i++){
        let j = 0
        while(j<bookings.length){
            if(i>=bookings[j][0] && i<=bookings[j][1]){
                y+=bookings[j][2]
            }
            j++
        }
        res.push(y)
        y = 0
    }
    return res
};

// 官方题解 - 查分法
var corpFlightBookings = function(bookings, n) {
    const nums = new Array(n).fill(0);
    for (const booking of bookings) {
        nums[booking[0] - 1] += booking[2];
        if (booking[1] < n) {
            nums[booking[1]] -= booking[2];
        }
    }
    for (let i = 1; i < n; i++) {
        nums[i] += nums[i - 1];
    }
    return nums;
};