// var rightSideView = function (root) {
//     let results = [];
//     function dfs(root, step, res) {
//         if (root) {
//             if (res.length === step) {
//                 results.push(root.val);
//             }
//             dfs(root.right, step + 1, res);
//             dfs(root.left, step + 1, res);
//         }
//     }

//     dfs(root, 0, results)
//     return results;
// };
// let res = rightSideView([1,2,3,null,5,null,4])
// console.log(res)

// 1. 两数之和
// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

// 暴力简单法   双层循环
var twoSum = function (nums, target) {
    // let _temp = null
    let _res = []
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                _res = [i, j]
            }
        }
    }
    return _res
};

// 循环 差值法
var twoSums = function (nums = [2, 11, 7, 15], target = 9) {
    let temp = null
    let _res = []
    for (let i = 0; i < nums.length; i++) {
        temp = target - nums[i]
        if (nums.indexOf(temp) !== -1) {
            _res = [i, nums.indexOf(temp)]
        }
    }
    return _res
};
console.log('twoSums:', twoSums())

// while + 对象 差值法 96 ms  38.6 MB
var twoSum2 = function (nums = [2, 7, 11, 15], target = 9) {
    let _ball = {}
    let _res = 0
    let dis
    while (_res < nums.length) {
        dis = target - nums[_res]
        if (_ball[dis] !== undefined) {
            return [_ball[dis], _res]
        }
        _ball[nums[_res]] = _res
        _res++
    }

    return _res
};

var twoSum = function (nums, target) {
    let _obj = {}
    let temp = null
    for (let i = 0; i < nums.length; i++) {
        temp = target - nums[i]
        if (_obj[temp] !== undefined) {
            return [_obj[temp], i]
        }
        _obj[nums[i]] = i
    }
};

console.log('twosum2:', twoSum2())

// 直接操作nums
var twoSum3 = function (nums = [2, 7, 11, 15], target = 9) {
    let i = nums.length;
    while (i > 1) {
        let last = nums.pop();
        if (nums.indexOf(target - last) > -1) {
            return [nums.indexOf(target - last), nums.length]
        }
        i--
    }
};
console.log('twosum3:', twoSum3())


// es6写法   --- map  96 ms  38.5 MB
var twoSum4 = function (nums = [2, 7, 11, 15], target = 9) {
    let _scool = new Map()
    for (let i = 0; i < nums.length; i++) {
        let _temp = target - nums[i]
        if (_scool.has(_temp)) {
            return [_scool.get(_temp), i]
        }
        _scool.set(nums[i], i)
    }
};
console.log('twosum4:', twoSum4())

// 排序算法   内层循环作比较 时间复杂度 O(n²)  空间复杂度 最差O(n)
let arr = [12, 3, 44, 56, 90, 0]

// 定义交换方法
function swap(arr, index1, index2) {
    var temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
}
// 1 冒泡排序
function bubblesort1(obj) {
    for (let i = obj.length; i >= 2; --i) {
        for (let j = 0; j <= i - 1; ++j) {
            if (obj[j] < obj[j + 1]) {
                swap(obj, j, j + 1)
            }
        }
    }
    return obj
}
console.log('冒泡排序', bubblesort1(arr))
// 2 选择排序
function bubblesort2(obj) {
    let min
    for (let i = 0; i <= obj.length - 2; ++i) {
        min = i
        for (let j = i + 1; j <= obj.length - 1; ++j) {
            if (obj[i] > obj[j]) {
                min = j
            }
            swap(obj, i, min)
        }
    }
    return obj
}
console.log('选择排序', bubblesort2(arr))
// 3 插入排序
function bubblesort3(obj) {
    let inner
    let temp
    for (let i = 1; i <= obj.length - 1; ++i) {
        inner = i
        temp = obj[i]
        while (inner > 0 && obj[inner - 1] > temp) {
            obj[inner] = obj[inner - 1]
            inner--
        }
        obj[inner] = temp
    }
    return obj
}
console.log('插入排序', bubblesort3(arr))
// 4 快速排序
function bubblesort4(obj) {
    if (obj.length === 0) {
        return []
    }
    let lefts = [];
    let rights = [];
    let pivot = obj[0]
    for (let i = 1; i < obj.length; ++i) {
        if (obj[i] < pivot) {
            lefts.push(obj[i])
        } else {
            rights.push(obj[i])
        }
    }
    return bubblesort4(lefts).concat(pivot, bubblesort4(rights))
}
console.log('快速排序', bubblesort4(arr))

// 时间排序

let res = [6, 1, 3, 4]

function time(val) {
    setTimeout(() => {
        console.log(val)
    }, val)
}
for (let i = 0; i < res.length; i++) {
    time(res[i])
}

// 1431 拥有最多糖果的孩子

var kidsWithCandies = function (candies, extraCandies) {
    // let max = Math.max.apply(null,candies)
    let max = Math.max(...candies)
    let _res = []
    for (let i = 0; i <= candies.length - 1; i++) {
        _res.push(candies[i] + extraCandies >= max)
    }
    return _res
};
console.log(kidsWithCandies([2, 3, 5, 1, 3], 3))

// 152 乘积最大子数组
var maxProduct = function (nums) {
    let maxF = nums[0]
    let minF = nums[0]
    let ans = nums[0]
    for (let i = 1; i < nums.length; ++i) {
        mx = maxF, mn = minF;
        maxF = Math.max(mx * nums[i], Math.max(nums[i], mn * nums[i]));
        minF = Math.min(mn * nums[i], Math.min(nums[i], mx * nums[i]));
        ans = Math.max(maxF, ans);
    }
    return ans;
};
console.log(maxProduct([2, 3, -2, 1, 2, 7, 8, 0]))

// 字符串=>转为树形机构
let _str = ['动物-昆虫-蚂蚁', '动物-昆虫-蝴蝶', '植物-草-绿色', '植物-花-红色']

function tryTree(srcList) {
    let destList = []
    srcList.forEach(path => {
        let pathList = path.split('-')
        let levelList = destList
        for (let name of pathList) {
            let obj = levelList.find(item => item.name == name)
            if (!obj) {
                obj = {
                    name,
                    children: []
                }
                levelList.push(obj)
            }
            levelList = obj.children
        }
    })
    return destList
}
// console.log(JSON.stringify(tryTree(_str), null, 2))

// tree   2
let _arr = [{
        id: 1,
        name: "微信",
        webSiteAndTypes: [{
                fkWebsiteTypeId: 1,
                groupName: "聊天软件"
            },
            {
                fkWebsiteTypeId: 9,
                groupName: "热门"
            },
            {
                fkWebsiteTypeId: 10,
                groupName: "常用软件"
            }
        ]
    },
    {
        id: 2,
        name: "钉钉",
        webSiteAndTypes: [{
                fkWebsiteTypeId: 2,
                groupName: "办公软件"
            },
            {
                fkWebsiteTypeId: 9,
                groupName: "热门"
            },
            {
                fkWebsiteTypeId: 10,
                groupName: "常用软件"
            }
        ]
    },
    {
        id: 3,
        name: "美团",
        webSiteAndTypes: [{
                fkWebsiteTypeId: 5,
                groupName: "生活便利"
            },
            {
                fkWebsiteTypeId: 9,
                groupName: "热门"
            },
        ]
    },
    {
        id: 4,
        name: "智行火车票",
        webSiteAndTypes: [{
                fkWebsiteTypeId: 4,
                groupName: "出行软件"
            },
            {
                fkWebsiteTypeId: 9,
                groupName: "热门"
            }
        ]
    },
    {
        id: 5,
        name: "淘宝",
        webSiteAndTypes: [{
                fkWebsiteTypeId: 6,
                groupName: "购物软件"
            },
            {
                fkWebsiteTypeId: 10,
                groupName: "常用软件"
            },
            {
                fkWebsiteTypeId: 9,
                groupName: "热门"
            }
        ]
    },
    {
        id: 6,
        name: "京东",
        webSiteAndTypes: [{
                fkWebsiteTypeId: 6,
                groupName: "购物软件"
            },
            {
                fkWebsiteTypeId: 10,
                groupName: "常用软件"
            },
            {
                fkWebsiteTypeId: 9,
                groupName: "热门"
            }
        ]
    },
]

function tryTree2(srcArr) {
    let _res = []
    srcArr.forEach(item => {
        let _data = {
            id: item.id,
            name: item.name
        }
        item.webSiteAndTypes.forEach(el => {
            let ball = _res.find(item => item.fkWebsiteTypeId === el.fkWebsiteTypeId)
            if (!ball) {
                _res.push({
                    groupName: el.groupName,
                    fkWebsiteTypeId: el.fkWebsiteTypeId,
                    websites: [_data]
                })
            } else {
                ball.websites.push(_data)
            }

        })
    })
    return _res
}

function group(list) {
    const map = {}
    const result = []
    list.forEach(item => {
        item.webSiteAndTypes.forEach(({
            fkWebsiteTypeId,
            groupName
        }) => {
            if (!map[fkWebsiteTypeId]) {
                map[fkWebsiteTypeId] = {
                    groupName,
                    fkWebsiteTypeId,
                    websites: []
                }
                result.push(map[fkWebsiteTypeId])
            }
            map[fkWebsiteTypeId].websites.push(item)
        })
    })
    return result
}
// console.log(JSON.stringify(tryTree2(_arr), null, 2))
// console.log(JSON.stringify(group(_arr), null, 2))

// 回文数  121 => true 12122 => false

let isPalindrome = (obj) => {
    if (obj < 0) {
        return false
    }
    obj += ''
    let len = obj.length
    for (let i = 0; i < (len + 1) / 2; ++i) {
        if (obj[i] !== obj[(len - i - 1)]) {
            return false
        }
    }
    return true
}
console.log(isPalindrome(12114521))


// 验证回文串

// 1 折中
var isPalindrome1 = function (s) {
    let _data = s.match(/\d|\w/g)
    for (let i = 0; len = _data.length, i < (len / 2) + 1; i++) {
        if (_data[i].toLocaleLowerCase() !== _data[len - i - 1].toLocaleLowerCase()) {
            return false
        }
    }
    return true
};
console.log('isPalindrome1', isPalindrome1("A man, a plan, a csanal: Panama"))

// 2 双指针解法

var isPalindrome2 = function (s) {
    let _data = s.match(/\d|\w/g)
    let left = 0
    let right = _data.length - 1
    while (left < right) {
        if (_data[left].toLocaleLowerCase() !== _data[right].toLocaleLowerCase()) {
            return false
        }
        left++
        right--
    }
    return true
};
console.log('isPalindrome2', isPalindrome2("1A man, a plan, a canal: Panama1"))

// 二进制求和

// 题意描述：给你两个二进制字符串，返回它们的和（用二进制表示）。输入为 非空 字符串且只包含数字 1 和 0。
let a = '11'
let b = '1'

// api  解法

var addBinary = function (a, b) {
    let _res = parseInt(a, 2) + parseInt(b, 2)
    return _res.toString(2)
};
console.log('addBinary', addBinary(a, b))

// 牛逼解法

var addBinary1 = function (a, b) {
    let ans = "";
    let ca = 0;
    for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
        let sum = ca;
        sum += i >= 0 ? parseInt(a[i]) : 0;
        sum += j >= 0 ? parseInt(b[j]) : 0;
        ans += sum % 2;
        ca = Math.floor(sum / 2);
    }
    console.log(ans, ca)
    ans += ca == 1 ? ca : "";

    return ans.split('').reverse().join('');
};
console.log('addBinary1', addBinary1(a, b))


// 循环效率比较
let both = Array.from(Array(1000000), (v, a) => a + 1)

let oldnow = new Date().getTime()
// console.log(both, now)
console.log(both.includes(500))
let newnow = new Date().getTime()
console.log(newnow - oldnow)

// 序列化与反序列化
const ins = [1, 2, 3, null, null, 4, 5]

// const path = require('path')
// console.log(path)
function get(value) {
    let wordreg = /[a-z]/g
    let commareg = /[,]/g
    let _commalen = value.match(commareg)
    value = value.replace(commareg, '')
    let _wordlen = value.match(wordreg)
    value = value.replace(wordreg, '')
    return value.length + Math.floor(_commalen.length / 2) + Math.floor(_wordlen.length / 2)
}
console.log('fdffffffff', get('ssssss方法十三点,,，'))


// 比较两个数是否完全相等

// 输入:       1         1
//           / \       / \
//          2   3     2   3

//         [1,2,3],   [1,2,3]

// 递归-解法
var isSameTree = function (p, q) {
    if (p == null && q == null) {
        return true;
    }
    if (p == null || q == null) {
        return false;
    }
    if (p.val != q.val) {
        return false;
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
console.log(isSameTree())


// 计数二进制子串
// 给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。

// 重复出现的子串要计算它们出现的次数。

// 示例 1 :

// 输入: "00110011"
// 输出: 6
// 解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。

// 请注意，一些重复出现的子串要计算它们出现的次数。

// 另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。

var countBinarySubstrings = function (s) {
    let last, cur, res;
    last = res = 0;
    cur = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i] == s[i - 1]) {
            cur++;
        } else {
            last = cur;
            cur = 1;
        }
        if (last >= cur) {
            res++;
        }
    }
    return res;
};


// 43. 字符串相乘
// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

// 示例 1:

// 输入: num1 = "2", num2 = "3"
// 输出: "6"

var multiply = function (num1, num2) {
    if (num1 == '0' || num2 == '0') return '0';
    num1 = num1 + '';
    num2 = num2 + '';
    let l1 = num1.length,
        l2 = num2.length,
        store = new Array(l1 + l2 - 1).fill(0),
        t = 0,
        r = '';
    for (let i = 0; i < l2; i++) {
        for (let j = 0; j < l1; j++) {
            store[i + j] += (+num2[i] * +num1[j])
        }
    }
    let k = store.length;
    while (k--) {
        t += store[k];
        r = t % 10 + r;
        t = t / 10 | 0;
    }
    return t > 0 ? (t + r) : r;
}


//   查找数组中的重复项

// 	128 ms	43.2 MB
var findRepeatNumber = function (nums) {
    let _other = {}
    for (let i = 0; i <= nums.length; i++) {
        if (_other[nums[i]] !== undefined) {
            return nums[i]
        }
        _other[nums[i]] = i
    }
};
//	96 ms	43.5 MB
var findRepeatNumber = function (nums) {
    let _other = {}
    let _index = 0
    while (_index < nums.length) {
        if (_other[nums[_index]] !== undefined) {
            return nums[_index]
        }
        _other[nums[_index]] = _index
        _index++
    }
};

// 647. 回文子串
// 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。



// 示例 1：

// 输入："abc"
// 输出：3
// 解释：三个回文子串: "a", "b", "c"

var countSubstrings = function (s) {
    const n = s.length;
    let ans = 0;
    for (let i = 0; i < 2 * n - 1; ++i) {
        let l = i / 2,
            r = i / 2 + i % 2;
        // console.log('l=>', l)
        // console.log('r  =>', r)
        while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
            --l;
            ++r;
            ++ans;
        }
    }
    return ans;
};
console.log(countSubstrings('abcaaaaaaa'))


// 347. 前 K 个高频元素
// 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
// 示例 1:

// 输入: nums = [1,1,1,2,2,3], k = 2
// 输出: [1,2]


// 暴力解法1
var topKFrequent = function (nums, k) {
    // 记录元素出现次数
    let obj = {}
    for (let i = 0; i <= nums.length - 1; i++) {
        if (obj[nums[i]] === undefined) {
            obj[nums[i]] = 0
        }
        obj[nums[i]]++
    }
    return [...new Set(nums)].sort((a, b) => {
        return obj[b] - obj[a]
    }).slice(0, k)
};
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2))

// 暴力解法2
// var topKFrequent1 = function(nums, k) {
//     // 记录元素出现次数
//     let obj = {}
//     for(let i=0;i<=nums.length-1;i++){ 
//         if(obj[nums[i]] === undefined){
//             obj[nums[i]] = 0
//         }
//         obj[nums[i]]++
//     }
//     return [...new Set(nums)].sort((a,b)=>{return obj[b] - obj[a]}).slice(0,k)
// };
// console.log(topKFrequent1([1,1,1,2,2,3],2))


// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

// 示例:

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// 力扣上的
const combine = (n, k) => {
    const res = [];

    const helper = (start, path) => { // start是枚举选择的起点 path是当前构建的路径（组合）
        // console.log('path',path)
        if (path.length == k) {
            res.push(path.slice()); // 拷贝一份path，推入res
            return; // 结束当前递归
        }
        for (let i = start; i <= n; i++) { // 枚举出所有选择
            path.push(i); // 选择
            helper(i + 1, path); // 向下继续选择
            path.pop(); // 撤销选择

        }
    };

    helper(1, []); // 递归的入口，从数字1开始选
    return res;
}
// 1 2 3 4
console.log('combine', combine(4, 3))

// 力扣官方的
var combine1 = function (n, k) {
    const temp = [];
    const ans = [];
    // 初始化
    // 将 temp 中 [0, k - 1] 每个位置 i 设置为 i + 1，即 [0, k - 1] 存 [1, k]
    // 末尾加一位 n + 1 作为哨兵
    for (let i = 1; i <= k; ++i) {
        temp.push(i);
    }
    temp.push(n + 1);

    let j = 0;
    while (j < k) {
        ans.push(temp.slice(0, k));
        j = 0;
        // 寻找第一个 temp[j] + 1 != temp[j + 1] 的位置 t
        // 我们需要把 [0, t - 1] 区间内的每个位置重置成 [1, t]
        while (j < k && temp[j] + 1 == temp[j + 1]) {
            temp[j] = j + 1;
            ++j;
        }
        // j 是第一个 temp[j] + 1 != temp[j + 1] 的位置
        ++temp[j];
    }
    return ans;
};
console.log('combine1', combine1(4, 3))

// 素数  筛法   除了1和它本身以外不再有其他因数的自然数。

function prime(max) {
    let isNoPrime = [true, true];
    let n = 1;
    while (++n < max) {
        if (!isNoPrime[n]) {
            // console.log(n)
            for (let v = n * 2; v < max; v += n) {
                isNoPrime[v] = true
            }
        }
    }
    return isNoPrime
}
// console.log('prime',prime(20))



// 判断一个数  是不是素数
function isprime(num) {
    for (let i = 1; i < num; i++) {
        if (num % i === 0 && i !== 1) {
            return false
        }
    }
    return true;
}
console.log('isprime', isprime(17))


function intersection(...arrays) {
    let result = []
    let temp = arrays[0]
    let _index = 0
    while (_index < temp.length) {
        let show = true
        for (let i = 1; i < arrays.length; i++) {
            if (!arrays[i].includes(temp[_index])) {
                show = false
            }
        }
        if (show) {
            result.push(temp[_index])
        }
        _index++
    }
    return result
}

function intersection1(...arrays) {
    let _arr = arrays.flat(2)
    let result = []
    let _res = _arr.reduce((pre, cru) => {
        if (cru in pre) {
            pre[cru]++
        } else {
            pre[cru] = 0
        }
        return pre
    }, {})
    Object.keys(_res).forEach(item => {
        if (_res[item] === arrays.length - 1) {
            result.push(item)
        }
    })
    return result
}
const arr1 = [1, 2, 3, 4, 1, 5]
const arr2 = [4, 2, 1, 5, 6, 7]
const arr3 = [2, 4, 7, 8, 3]

// 输出 [2,4]
console.log(intersection(arr1, arr2, arr3))
// 输出 [2,4]
console.log(intersection1(arr1, arr2, arr3))


// 移动0
// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]

var moveZeroes = function (nums) {
    let _index = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[_index++] = nums[i]
        }
    }
    for (let i = _index; i < nums.length; i++) {
        nums[i] = 0
    }
};
console.log('moveZeroes', moveZeroes([0, 1, 0, 3, 12]))


var moveZeroes1 = function (nums) {
    let _left = 0 //记录非零处理到的下标处
    let _right = 0 //记录从下标0处理到的位置
    const swap = (left, right) => {
        let temp = null
        temp = nums[right]
        nums[right] = nums[left]
        nums[left] = temp

    }
    // 把非0的数字一个一个往前挤
    while (_right < nums.length) {
        if (nums[_right] !== 0) {
            swap(_left, _right)
            _left++
        }
        _right++
    }
};
console.log('moveZeroes1', moveZeroes1([0, 1, 0, 3, 12]));



// 射气球 力扣452 
// 输入：points = [[10,16],[2,8],[1,6],[7,12]]
// 输出：2
// 解释：对于该样例，x = 6 可以射爆 [2,8],[1,6] 两个气球，以及 x = 11 射爆另外两个气球


// 官方题解 排序+贪心算法


//                    [10.........16]
//    [2..........8]
// [1.......6]
//              [7.........12]

var findMinArrowShots = function (points) {
    if (!points.length) return 0
    // 升序排序
    points.sort((a, b) => {
        return a[1] - b[1]
    })
    console.log(points)
    // 每一个气球最大的比下一个气球最小的大  说明满足刺穿条件 ；如果连下一个最小的都比它大，那就真的没戏刺穿了；相应的箭+1
    let _res = 1
    let _point = points[0][1]; //先拿右边最小的做基准值
    for (let i = 1; i < points.length; i++) {
        if (_point < points[i][0]) {
            _res++
            _point = points[i][1]
        }
    }
    return _res
};
console.log('findMinArrowShots()', findMinArrowShots(
    [
        [10, 16],
        [2, 8],
        [1, 6],
        [7, 12]
    ]
))

// 四数相加
// 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。

// 为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1 。

// 例如:

// 输入:
// A = [ 1, 2]
// B = [-2,-1]
// C = [-1, 2]
// D = [ 0, 2]

// 输出:
// 2

// 解释:
// 两个元组如下:
// 1. (0, 0, 0, 1) -> A[0] + B[0] + C[0] + D[1] = 1 + (-2) + (-1) + 2 = 0
// 2. (1, 1, 0, 0) -> A[1] + B[1] + C[0] + D[0] = 2 + (-1) + (-1) + 0 = 0


var fourSumCount = function (A, B, C, D) {
    // 先记录AB两个数组的所有组合
    let _map = new Map()
    let _res = 0
    for (let a of A) {
        for (let b of B) {
            _map.set((a + b), (_map.get(a + b) || 0) + 1)
        }
    }
    // 遍历CD两个数组 cd元素和的负值已经存在说明条件成立
    for (let c of C) {
        for (let d of D) {
            if (_map.has(-(c + d))) {
                _res += _map.get(-(c + d))
            }
        }
    }
    return _res
};
console.log('fourSumCount', fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]))


// 在柠檬水摊上，每一杯柠檬水的售价为 5 美元。
// 顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。
// 每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。
// 注意，一开始你手头没有任何零钱。
// 如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

var lemonadeChange = function (bills) {
    let _len = bills.length
    let five = 0
    let ten = 0
    for (let i = 0; i < _len; i++) {
        if (bills[i] == 5) {
            five += 1
        } else if (bills[i] == 10) {
            if (five == 0) {
                return false
            }
            five -= 1
            ten += 1
        } else {
            if (ten > 0 && five > 0) {
                ten -= 1
                five -= 1
            } else if (five >= 3) {
                five -= 3
            } else {
                return false
            }
        }
    }
    return true
};
console.log('lemonadeChange', lemonadeChange([5, 5, 5, 10, 20]));



// 统计最大组的数目
// 给你一个整数 n 。请你先求出从 1 到 n 的每个整数 10 进制表示下的数位和（每一位上的数字相加），然后把数位和相等的数字放到同一个组中。
// 请你统计每个组中的数字数目，并返回数字数目并列最多的组有多少个。

// 示例 1：

// 输入：n = 13
// 输出：4
// 解释：总共有 9 个组，将 1 到 13 按数位求和后这些组分别是：
// [1,10]，[2,11]，[3,12]，[4,13]，[5]，[6]，[7]，[8]，[9]。总共有 4 个组拥有的数字并列最多。

var countLargestGroup = function (n) {
    let _obj = {}
    let max = 0
    let _res = 0
    let i = 1
    while (i <= n) {
        // [...String(33)]   == (i += '').split('')
        let sum = (i += '').split('').reduce((pre, cru) => {
            return Number(pre) + Number(cru)
        })
        if (_obj[sum]) {
            _obj[sum] += 1
        } else {
            _obj[sum] = 1
        }
        if (_obj[sum] >= max) {
            max = _obj[sum]
        }
        i++
    }
    Object.keys(_obj).forEach(el => {
        if (_obj[el] == max) {
            _res += 1
        }
    })
    console.log(_res)
    return _res
};
console.log('countLargestGroup', countLargestGroup(13));


// 746. 使用最小花费爬楼梯
// 数组的每个索引作为一个阶梯，第 i个阶梯对应着一个非负数的体力花费值 cost[i](索引从0开始)。

// 每当你爬上一个阶梯你都要花费对应的体力花费值，然后你可以选择继续爬一个阶梯或者爬两个阶梯。

// 您需要找到达到楼层顶部的最低花费。在开始时，你可以选择从索引为 0 或 1 的元素作为初始阶梯。

// 示例 1:

// 输入: cost = [10, 15, 20]
// 输出: 15
// 解释: 最低花费是从cost[1]开始，然后走两步即可到阶梯顶，一共花费15。
//  示例 2:

// 输入: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
// 输出: 6
// 解释: 最低花费方式是从cost[0]开始，逐个经过那些1，跳过cost[3]，一共花费6。


var minCostClimbingStairs = function (cost) {
    let l = cost.length
    // let _arr = new Array(l+1)
    // _arr[0] = _arr[1] = 0
    let v = g = 0 //滚筒数组 就是用这两个值存着前一个和前两个值
    for (let i = 2; i <= l; i++) {
        // 动态规划的体现 在走一个台阶和两个台阶之间取最小值
        next = Math.min(v + cost[i - 1], g + cost[i - 2])
        g = v
        v = next
    }
    return v
};




// 387. 字符串中的第一个唯一字符
// 示例：

// s = "leetcode"
// 返回 0

// s = "loveleetcode"
// 返回 2

var firstUniqChar = function (s) {
    let _b = []
    for (let i = 0; i < s.length; i++) {
        if (s.lastIndexOf(s[i]) === i && !_b.includes(s[i])) {
            return i
        }
        _b.push(s[i])
    }
    return -1

};

// 这个方法看不懂 跑不起来
var firstUniqChar1 = function (s) {
    const frequency = _.countBy(s);
    for (const [i, ch] of Array.from(s).entries()) {
        if (frequency[ch] === 1) {
            return i;
        }
    }
    return -1;
}

console.log('firstUniqChar', firstUniqChar('loveleetcode'))
// console.log('firstUniqChar1',firstUniqChar1('loveleetcode'))
let r = ['fdfd', 'rrr', 33]
console.log('rrrrr', r.entries())

// 3. 无重复字符的最长子串
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。


var lengthOfLongestSubstring = function (s) {
    if (s.length == 0) {
        return 0
    }

    // let _res = ''
    let _b = 0

    // 1 
    // for(let i=0;i<s.length;i++){
    //     let temp = s[i]
    //     for(let j=i+1;j<s.length;j++){
    //         if(!temp.includes(s[j])){
    //             temp += s[j]
    //         }else{
    //             break
    //         }
    //     }
    //     _res = Math.max(_res,temp.length)
    // }

    // 2 使用了while 和官方的方法思路差不多 但是使用set会更快
    // for(let i=0;i<s.length;i++){
    //     let temp = s[i]
    //     _b = i + 1
    //     while(_b<s.length && temp.indexOf(s[_b]) === -1){
    //         temp += s[_b]
    //         _b++
    //     }
    //     _res = Math.max(_res,temp.length)
    // }

    // 3. 官方的题解   滑动窗口
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1,
        ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        console.log(occ)
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
console.log('lengthOfLongestSubstring', lengthOfLongestSubstring('abcabcbb'))


// 斐波那契数列

// 1. 这个方法时间复杂度和空间复杂度都要快一些   有的人叫它动态规划
var fib = function (n) {
    let _res = [0, 1]
    if (n < 2) {
        return _res[n]
    }
    for (let i = 2; i <= n; ++i) {
        _res.push(_res[i - 1] + _res[i - 2])
    }
    return _res[n]
};

// 1.2 官方的这个写法比较秀 用到了类似于滚动数组的意思
var fib = function(n) {
    if (n < 2) {
        return n;
    }
    let p = 0, q = 0, r = 1;
    for (let i = 2; i <= n; i++) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
};
// 2. 递归
var fib1 = function (n) {
    if (n < 2) {
        return n
    } else {
        return fib(n - 1) + fib(n - 2)
    }
};

// 830. 较大分组的位置
// 在一个由小写字母构成的字符串 s 中，包含由一些连续的相同字符所构成的分组。
// 例如，在字符串 s = "abbxxxxzyy" 中，就含有 "a", "bb", "xxxx", "z" 和 "yy" 这样的一些分组。
// 分组可以用区间 [start, end] 表示，其中 start 和 end 分别表示该分组的起始和终止位置的下标。上例中的 "xxxx" 分组用区间表示为 [3,6] 。
// 我们称所有包含大于或等于三个连续字符的分组为 较大分组 。
// 找到每一个 较大分组 的区间，按起始位置下标递增顺序排序后，返回结果。

var largeGroupPositions = function(s) {
    let _res = []
    for(let i=0;i<s.length;++i){
        let _right = i
        let j = i + 1
        while(j<s.length && s[j] == s[i]){
            _right++
            j++
        }
        if((_right - i) >= 2){
            _res.push([i,_right])
            i = _right
        }
    }
    return _res
};

// 官方的 时间复杂度：O(n)   空间复杂度：O(1) 但是上面的方法执行起来比官方的要快 内存上稍有劣势
var largeGroupPositions1 = function(s) {
    const ret = [];
    const n = s.length;
    let num = 1;
    for (let i = 0; i < n; i++) {
        if (i === n - 1 || s[i] !== s[i + 1]) {
            if (num >= 3) {
                ret.push([i - num + 1, i]);
            }
            num = 1;
        } else {
            num++;
        }
    }
    return ret;
};
