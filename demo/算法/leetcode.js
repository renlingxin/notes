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
var fib = function (n) {
    if (n < 2) {
        return n;
    }
    let p = 0,
        q = 0,
        r = 1;
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

var largeGroupPositions = function (s) {
    let _res = []
    for (let i = 0; i < s.length; ++i) {
        let _right = i
        let j = i + 1
        while (j < s.length && s[j] == s[i]) {
            _right++
            j++
        }
        if ((_right - i) >= 2) {
            _res.push([i, _right])
            i = _right
        }
    }
    return _res
};

// 官方的 时间复杂度：O(n)   空间复杂度：O(1) 但是上面的方法执行起来比官方的要快 内存上稍有劣势
var largeGroupPositions1 = function (s) {
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


// 628. 三个数的最大乘积
// 给定一个整型数组，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

// 示例 1:

// 输入: [ 4, 3, 2, -1, -98, -100 ]
// 输出: 39200

var maximumProduct = function (nums) {
    nums.sort((a, b) => {
        return b - a
    })
    let _res = nums[nums.length - 1] * nums[nums.length - 2] * nums[0]
    let _res1 = nums[0] * nums[1] * nums[2]
    if (_res > _res1) {
        return _res
    }
    return _res1
};
// 时间复杂度：O(N\log N)O(NlogN)，其中 NN 为数组长度。排序需要 O(N\log N)O(NlogN) 的时间。

// 空间复杂度：O(\log N)O(logN)，主要为排序的空间开销。


// 官方的题解二  整体思路和上面的一样   名字叫线性扫描  时间复杂度和空间复杂度都好
var maximumProduct1 = function (nums) {
    // 最小的和第二小的
    let min1 = Number.MAX_SAFE_INTEGER,
        min2 = Number.MAX_SAFE_INTEGER;
    // 最大的、第二大的和第三大的
    let max1 = -Number.MAX_SAFE_INTEGER,
        max2 = -Number.MAX_SAFE_INTEGER,
        max3 = -Number.MAX_SAFE_INTEGER;

    for (const x of nums) {
        if (x < min1) {
            min2 = min1;
            min1 = x;
        } else if (x < min2) {
            min2 = x;
        }

        if (x > max1) {
            max3 = max2;
            max2 = max1;
            max1 = x;
        } else if (x > max2) {
            max3 = max2;
            max2 = x;
        } else if (x > max3) {
            max3 = x;
        }
    }

    return Math.max(min1 * min2 * max1, max1 * max2 * max3);
};

// 时间复杂度：O(N)O(N)，其中 NN 为数组长度。我们仅需遍历数组一次。

// 空间复杂度：O(1)O(1)。


// 1337. 矩阵中战斗力最弱的 K 行
// 给你一个大小为 m * n 的矩阵 mat，矩阵由若干军人和平民组成，分别用 1 和 0 表示。

// 请你返回矩阵中战斗力最弱的 k 行的索引，按从最弱到最强排序。

// 如果第 i 行的军人数量少于第 j 行，或者两行军人数量相同但 i 小于 j，那么我们认为第 i 行的战斗力比第 j 行弱。

// 军人 总是 排在一行中的靠前位置，也就是说 1 总是出现在 0 之前。



// 示例 1：

// 输入：mat = 
// [[1,1,0,0,0],
//  [1,1,1,1,0],
//  [1,0,0,0,0],
//  [1,1,0,0,0],
//  [1,1,1,1,1]], 
// k = 3
// 输出：[2,0,3]
var kWeakestRows = function (mat, k) {
    let _res = new Map()
    for (let i = 0; i < mat.length; i++) {
        let temp = mat[i].lastIndexOf(1) + 1
        _res.set(i, temp)
    }

    let y = [..._res].sort((a, b) => {
        return a[1] - b[1]
    }).slice(0, k)

    let t = []
    y.forEach(e => t.push(e[0]))
    return t
};
console.log('kWeakestRows', kWeakestRows([
    [1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1]
], 3));


// 989. 数组形式的整数加法
// 对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。

// 给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。



// 示例 1：

// 输入：A = [1,2,0,0], K = 34
// 输出：[1,2,3,4]
// 解释：1200 + 34 = 1234

var addToArrayForm = function (A, K) {
    const res = [];
    const n = A.length;
    for (let i = n - 1; i >= 0; --i) {
        let sum = A[i] + K % 10;
        K = Math.floor(K / 10);
        if (sum >= 10) {
            K++;
            sum -= 10;
        }
        res.push(sum);
        console.log(sum, K)
    }
    for (; K > 0; K = Math.floor(K / 10)) {
        res.push(K % 10);
    }
    res.reverse();
    return res;
};
console.log('addToArrayForm', addToArrayForm([2, 1, 5], 806));


// 1128. 等价多米诺骨牌对的数量
// 给你一个由一些多米诺骨牌组成的列表 dominoes。

// 如果其中某一张多米诺骨牌可以通过旋转 0 度或 180 度得到另一张多米诺骨牌，我们就认为这两张牌是等价的。

// 形式上，dominoes[i] = [a, b] 和 dominoes[j] = [c, d] 等价的前提是 a==c 且 b==d，或是 a==d 且 b==c。

// 在 0 <= i < j < dominoes.length 的前提下，找出满足 dominoes[i] 和 dominoes[j] 等价的骨牌对 (i, j) 的数量。



// 示例：

// 输入：dominoes = [[1,2],[2,1],[3,4],[5,6]]
// 输出：1


// 挨个比较
var numEquivDominoPairs = function (dominoes) {
    let _len = dominoes.length
    let _res = 0
    for (let i = 0; i < _len; i++) {
        let j = i + 1
        let a = dominoes[i]
        while (j < _len) {
            let b = dominoes[j]
            if (a[0] == b[0] && a[1] == b[1]) {
                _res += 1
            } else if (a[0] == b[1] && a[1] == b[0]) {
                _res += 1
            }
            j++
        }
    }
    return _res
};
// 官方
var numEquivDominoPairs1 = function (dominoes) {
    const num = new Array(100).fill(0);
    let ret = 0;
    for (const domino of dominoes) {
        const val = domino[0] < domino[1] ? domino[0] * 10 + domino[1] : domino[1] * 10 + domino[0];
        ret += num[val];
        num[val]++;
    }
    console.log('num', num);
    return ret;
};

console.log('numEquivDominoPairs', numEquivDominoPairs([
    [1, 2],
    [2, 1],
    [3, 4],
    [5, 6]
]))
console.log('numEquivDominoPair1s', numEquivDominoPairs1([
    [1, 2],
    [2, 1],
    [3, 4],
    [5, 6]
]))

// 724. 寻找数组的中心索引
// 给定一个整数类型的数组 nums，请编写一个能够返回数组 “中心索引” 的方法。

// 我们是这样定义数组 中心索引 的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

// 如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

function pivotIndex(nums) {
    let _left = 0
    for (let i = 0; i < nums.length; i++) {

        let j = i + 1
        let right = 0
        while (j < nums.length) {
            right += nums[j]
            j++
        }
        console.log(_left, right)
        if (_left === right) {
            return i
        }
        _left += nums[i]
        // if(getsum(nums,0,i)===getsum(nums,i+1,nums.length)){
        //     return i
        // }
    }
    return -1
};

// const getsum = (arr,index,last) => {
//     let _res = 0
//     for(let i=index;i<last;i++){
//         _res = _res+ arr[i]
//     }
//     return _res
// }

console.log('pivotIndexpivotIndex', pivotIndex([1, 7, 3, 6, 5, 6]))

// 官方的题解  先算出总数 然后从左开始遍历求和  如果 2*sum 等于总数 === 当前索引下的左右和是相等的
var pivotIndex = function (nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        if (2 * sum + nums[i] === total) {
            return i;
        }
        sum += nums[i];
    }
    return -1;
};



// 888. 公平的糖果棒交换
// 爱丽丝和鲍勃有不同大小的糖果棒：A[i] 是爱丽丝拥有的第 i 根糖果棒的大小，B[j] 是鲍勃拥有的第 j 根糖果棒的大小。

// 因为他们是朋友，所以他们想交换一根糖果棒，这样交换后，他们都有相同的糖果总量。（一个人拥有的糖果总量是他们拥有的糖果棒大小的总和。）

// 返回一个整数数组 ans，其中 ans[0] 是爱丽丝必须交换的糖果棒的大小，ans[1] 是 Bob 必须交换的糖果棒的大小。

// 如果有多个答案，你可以返回其中任何一个。保证答案存在。



// 示例 1：

// 输入：A = [1,1], B = [2,2]
// 输出：[1,2]

// 公式如下 设结果数组为x,y
// sumA − x+y = sumB + x−y
// x = y + (sumA - sumB) / 2


// 别人的方法  计算原始数组的差值 n 如果 两个数组的值差是 n/2 就满足条件
var fairCandySwap = function (A, B) {

    const asum = A.reduce((s, x) => s + x);
    const bsum = B.reduce((s, x) => s + x);
    const diff = asum - bsum;

    for (let i = 0; i < A.length; i++) {
        const num1 = A[i];
        const num2 = num1 - diff / 2;
        if (B.includes(num2)) {
            return [num1, num2]
        }
    }
};

// 官方的解法更简洁一点
var fairCandySwap1 = function (A, B) {
    const sumA = _.sum(A),
        sumB = _.sum(B);
    const delta = Math.floor((sumA - sumB) / 2);
    const rec = new Set(A);
    var ans;
    for (const y of B) {
        const x = y + delta;
        if (rec.has(x)) {
            ans = [x, y];
            break;
        }
    }
    return ans;
}
console.log('fairCandySwap', fairCandySwap([1, 2], [2, 3]))
// console.log('fairCandySwap1', fairCandySwap1([1, 2], [2, 3]));


// 给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。
// 示例：
// 输入：[1,12,-5,-6,50,3], k = 4
// 输出：12.75
// 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75

var findMaxAverage = function (nums, k) {
    let _res = Number.MIN_SAFE_INTEGER
    let i = 0
    while (i + k <= nums.length) {
        let temp = nums.slice(i, i + k)
        let sum = temp.reduce((a, b) => a + b) / k
        if (sum > _res) _res = sum
        i++
    }
    return _res
};
console.log(findMaxAverage([1, 12, -5, -6, 50, 3], k))

// 26. 删除排序数组中的重复项
// 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。



// 示例 1:

// 给定数组 nums = [1,1,2], 

// 函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

// 你不需要考虑数组中超出新长度后面的元素。

// 最笨的方法 找到了就删除
var removeDuplicates = function (nums) {
    let n = nums[0]
    let i = 1
    while (i < nums.length) {
        if (nums[i] === n) {
            nums.splice(i, 1)
            i = i - 1
        } else {
            n = nums[i]
        }
        ++i
    }
};


// 双指针 解法 时间复杂度和空间复杂度都比上面的好
var removeDuplicates = function (nums) {
    let p1 = 0 //在原数组上重新建立一个不重复的
    let p2 = 0 // 当前原数组比较到的位置
    while (p2 < nums.length) {
        if (nums[p1] !== nums[p2]) {
            p1++
            nums[p1] = nums[p2]
        }
        ++p2
    }
    return p1 + 1
};

// 27. 移除元素
// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

// 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

// 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

// 和上一个题类似 双指针解法
var removeElement = function (nums, val) {
    let p1 = 0
    let p2 = 0
    while (p2 <= nums.length - 1) {
        if (nums[p2] !== val) {
            nums[p1] = nums[p2]
            p1++
        }
        ++p2
    }
    return p1
};


// 35. 搜索插入位置
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 你可以假设数组中无重复元素。

// 示例 1:

// 输入: [1,3,5,6], 5
// 输出: 2

// 反向搜索
var searchInsert = function (nums, target) {
    let i = nums.length - 1;
    while (i >= 0) {
        if (nums[i] === target) {
            return i
        }
        if (nums[i] < target) {
            return i + 1
        }
        --i
    }
    return 0
};

// 正向搜索

var searchInsert1 = function (nums, target) {
    let i = 0;
    while (i < nums.length && nums[i] < target)
        i++;
    return i;
};



// 滑动窗口 ！！！！！！！！！！
// 1004. 最大连续1的个数 III
// 给定一个由若干 0 和 1 组成的数组 A，我们最多可以将 K 个值从 0 变成 1 。

// 返回仅包含 1 的最长（连续）子数组的长度。



// 示例 1：

// 输入：A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
// 输出：6
// 解释： 
// [1,1,1,0,0,1,1,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 6。

// 官方题解   滑动数组
var longestOnes = function (A, K) {
    const n = A.length;
    let left = 0,
        lsum = 0,
        rsum = 0;
    let ans = 0;
    for (let right = 0; right < n; ++right) {
        rsum += 1 - A[right];
        while (lsum < rsum - K) {
            lsum += 1 - A[left];
            ++left;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};
console.log('longestOnes', longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0]));


// def findSubArray(nums):
//     N = len(nums) # 数组/字符串长度
//     left, right = 0, 0 # 双指针，表示当前遍历的区间[left, right]，闭区间
//     sums = 0 # 用于统计 子数组/子区间 是否有效，根据题目可能会改成求和/计数
//     res = 0 # 保存最大的满足题目要求的 子数组/子串 长度
//     while right < N: # 当右边的指针没有搜索到 数组/字符串 的结尾
//         sums += nums[right] # 增加当前右边指针的数字/字符的求和/计数
//         while 区间[left, right]不符合题意：# 此时需要一直移动左指针，直至找到一个符合题意的区间
//             sums -= nums[left] # 移动左指针前需要从counter中减少left位置字符的求和/计数
//             left += 1 # 真正的移动左指针，注意不能跟上面一行代码写反
//         # 到 while 结束时，我们找到了一个符合题意要求的 子数组/子串
//         res = max(res, right - left + 1) # 需要更新结果
//         right += 1 # 移动右指针，去探索新的区间
//     return res


// 766. 托普利茨矩阵
// 给你一个 m x n 的矩阵 matrix 。如果这个矩阵是托普利茨矩阵，返回 true ；否则，返回 false 。

// 如果矩阵上每一条由左上到右下的对角线上的元素都相同，那么这个矩阵是 托普利茨矩阵 。



// 示例 1：
// 1 2 3 4
// 5 1 2 3 
// 9 5 1 2

// 输入：matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
// 输出：true
// 解释：
// 在上述矩阵中, 其对角线为: 
// "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]"。 
// 各条对角线上的所有元素均相同, 因此答案是 True 。

// 解题的重点是判断 每一个元素和他左上角的元素是否相等
var isToeplitzMatrix = function (matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (i - 1 >= 0 && j - 1 >= 0 && matrix[i - 1][j - 1] !== matrix[i][j]) {
                return false
            }
        }
    }
    return true
};

// 1052. 爱生气的书店老板
// 今天，书店老板有一家店打算试营业 customers.length 分钟。每分钟都有一些顾客（customers[i]）会进入书店，所有这些顾客都会在那一分钟结束后离开。

// 在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，那么 grumpy[i] = 1，否则 grumpy[i] = 0。 当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。

// 书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 X 分钟不生气，但却只能使用一次。

// 请你返回这一天营业下来，最多有多少客户能够感到满意的数量。


// 示例：

// 输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
// 输出：16
// 解释：
// 书店老板在最后 3 分钟保持冷静。
// 感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.


//  先算出基本顾客满意的数量  在判断X进行判断最终结果
var maxSatisfied = function (customers, grumpy, X) {
    let sum = 0
    for (let j = 0; j < customers.length; j++) {
        if (grumpy[j] == 0) {
            sum += customers[j]
        }
    }
    let left = 0;
    let right = X - 1
    let res = sum
    while (right <= grumpy.length - 1) {
        let t = sum
        for (let i = left; i <= right; i++) {
            if (grumpy[i] == 1) {
                t = t + customers[i]
            }
        }
        res = Math.max(res, t)
        right++
        left++
    }
    return res
};
// 832. 翻转图像
// 给定一个二进制矩阵 A，我们想先水平翻转图像，然后反转图像并返回结果。

// 水平翻转图片就是将图片的每一行都进行翻转，即逆序。例如，水平翻转 [1, 1, 0] 的结果是 [0, 1, 1]。

// 反转图片的意思是图片中的 0 全部被 1 替换， 1 全部被 0 替换。例如，反转 [0, 1, 1] 的结果是 [1, 0, 0]。



// 示例 1：

// 输入：[[1,1,0],[1,0,1],[0,0,0]]
// 输出：[[1,0,0],[0,1,0],[1,1,1]]
// 解释：首先翻转每一行: [[0,1,1],[1,0,1],[0,0,0]]；
//      然后反转图片: [[1,0,0],[0,1,0],[1,1,1]]
var flipAndInvertImage = function (A) {
    let i = 0
    while (i < A.length) {
        let res = A[i]
        let n = res.length
        let o = []
        for (let j = n - 1; j >= 0; j -- ) {
            o.push(Number(!Boolean(res[j])))
        }
        A[i] = o
        i++
    }
    return A
};
console.log(flipAndInvertImage([
    [1, 1, 0],
    [1, 0, 1],
    [0, 0, 0]
]));



// 给定一个整数数组  nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。

// 实现 NumArray 类：

// NumArray(int[] nums) 使用数组 nums 初始化对象
// int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点（也就是 sum(nums[i], nums[i + 1], ... , nums[j])）
//  

// 示例：

// 输入：
// ["NumArray", "sumRange", "sumRange", "sumRange"]
// [[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
// 输出：
// [null, 1, -1, -3]

// 解释：
// NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
// numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
// numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
// numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))


// 官方的题解  说真的我没咋看懂["NumArray", "sumRange", "sumRange", "sumRange"]这个数组；但是这里面的求和的想法不错可以学习下
var NumArray = function (nums) {
    const n = nums.length;
    this.sums = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        this.sums[i + 1] = this.sums[i] + nums[i];
    }
};

NumArray.prototype.sumRange = function (i, j) {
    console.log(this.sums) //[0, -2, -2, 1,-4, -2, -3]
    return this.sums[j + 1] - this.sums[i];
};

let _NumArray = new NumArray([-2, 0, 3, -5, 2, -1])
_NumArray.sumRange(0, 2)
_NumArray.sumRange(2, 5)
_NumArray.sumRange(0, 5)


// 338. 比特位计数
// 给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

// 示例 1:

// 输入: 2
// 输出: [0,1,1]
// 示例 2:

// 输入: 5
// 输出: [0,1,1,2,1,2]

// 自己写  先转二进制 再看二进制里面有几个1
var countBits = function (num) {
    let _res = []
    for (let i = 0; i <= num; ++i) {
        _i = i.toString(2)
        _res.push(eval(_i.split('').join('+')))
    }
    return _res
};
countBits(2) // [ 0, 1, 1 ]


// 官方1 直接计算
// 利用位运算的技巧，可以在一定程度上提升计算速度。按位与运算（\&&）的一个性质是：对于任意整数 xx，令 x=x \&(x-1)x=x&(x−1)，
// 该运算将 xx 的二进制表示的最后一个 11 变成 00。因此，对 xx 重复该操作，直到 xx 变成 00，则操作次数即为 xx 的「一比特数」。

var countBits1 = function (num) {
    const bits = new Array(num + 1).fill(0);
    for (let i = 0; i <= num; i++) {
        bits[i] = countOnes(i);
    }
    return bits
};

const countOnes = (x) => {
    let ones = 0;
    while (x > 0) {
        x &= (x - 1);
        ones++;
    }
    return ones;
}

// 动态规划——最高有效位

var countBits2 = function (num) {
    const bits = new Array(num + 1).fill(0);
    let highBit = 0;
    for (let i = 1; i <= num; i++) {
        if ((i & (i - 1)) == 0) {
            highBit = i;
        }
        bits[i] = bits[i - highBit] + 1;
    }
    return bits;
};

// 动态规划——最低设置位

var countBits3 = function (num) {
    const bits = new Array(num + 1).fill(0);
    for (let i = 1; i <= num; i++) {
        bits[i] = bits[i & (i - 1)] + 1;
    }
    return bits;
};


// 132. 分割回文串 II
// 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。

// 返回符合要求的 最少分割次数 。



// 示例 1：

// 输入：s = "aab"
// 输出：1
// 解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。

// 困难题  -  直接复制的答案
var minCut = function (s) {
    const n = s.length;
    const g = new Array(n).fill(0).map(() => new Array(n).fill(true));

    for (let i = n - 1; i >= 0; --i) {
        for (let j = i + 1; j < n; ++j) {
            g[i][j] = s[i] == s[j] && g[i + 1][j - 1];
        }
    }

    const f = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    for (let i = 0; i < n; ++i) {
        if (g[0][i]) {
            f[i] = 0;
        } else {
            for (let j = 0; j < i; ++j) {
                if (g[j + 1][i]) {
                    f[i] = Math.min(f[i], f[j] + 1);
                }
            }
        }
    }

    return f[n - 1];
};
console.log(minCut("aab"));

// 给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

// 在 S 上反复执行重复项删除操作，直到无法继续删除。

// 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

//  

// 示例：

// 输入："abbaca"
// 输出："ca"
// 解释：
// 例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。

// 有一些极端case  "aaaaaaaa"  "azxxzy"
var removeDuplicates = function (S) {
    let _res = S.split('')
    let i = 0
    while (i < _res.length) {
        if (_res[i] == _res[i + 1]) {
            _res.splice(i, 2)
            i--
        } else {
            i++
        }
        if (_res.length <= 1) return _res.join('')
    }
    return _res.join('')
};

console.log(removeDuplicates("aaaaaaaa"));



// 官方的解法   栈   也是依次遍历 如果当前元素和栈顶的元素相同就删除  不同就推入
var removeDuplicates = function (S) {
    const stk = [];
    for (const ch of S) {
        if (stk.length && stk[stk.length - 1] === ch) {
            stk.pop();
        } else {
            stk.push(ch);
        }
    }
    return stk.join('');
};

// 时间复杂度：O(n)O(n)，其中 nn 是字符串的长度。我们只需要遍历该字符串一次。

// 空间复杂度：O(n)O(n) 或 O(1)O(1)，取决于使用的语言提供的字符串类是否提供了类似「入栈」和「出栈」的接口。注意返回值不计入空间复杂度。


// 227. 基本计算器 II
// 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

// 整数除法仅保留整数部分。



// 示例 1：

// 输入：s = "3+2*2"
// 输出：7
// 示例 2：

// 输入：s = " 3/2 "
// 输出：1
// 示例 3：

// 输入：s = " 3+5 / 2 "
// 输出：5


// 这是官方的解法  建立一个栈 如果是加号后的数字就推进来 乘除就算一下栈顶的元素 然后替换 减法就推入负值  最后统一变成加法运算一下
//  charCodeAt  这里很不错 看不懂

var calculate = function (s) {
    s = s.trim();
    const stack = new Array();
    let preSign = '+';
    let num = 0;
    const n = s.length;
    for (let i = 0; i < n; ++i) {
        if (!isNaN(Number(s[i])) && s[i] !== ' ') {
            console.log(s[i].charCodeAt(), '0'.charCodeAt())
            num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
        }
        console.log(num)
        if (isNaN(Number(s[i])) || i === n - 1) {
            switch (preSign) {
                case '+':
                    stack.push(num);
                    break;
                case '-':
                    stack.push(-num);
                    break;
                case '*':
                    stack.push(stack.pop() * num);
                    break;
                default:
                    stack.push(stack.pop() / num | 0);
            }
            preSign = s[i];
            num = 0;
        }
    }
    let ans = 0;
    while (stack.length) {
        ans += stack.pop();
    }
    return ans;
};
console.log(calculate('33+2*2'))


// 1603. 设计停车系统
// 请你给一个停车场设计一个停车系统。停车场总共有三种不同大小的车位：大，中和小，每种尺寸分别有固定数目的车位。

// 请你实现 ParkingSystem 类：

// ParkingSystem(int big, int medium, int small) 初始化 ParkingSystem 类，三个参数分别对应每种停车位的数目。
// bool addCar(int carType) 检查是否有 carType 对应的停车位。 carType 有三种类型：大，中，小，分别用数字 1， 2 和 3 表示。一辆车只能停在  carType 对应尺寸的停车位中。如果没有空车位，请返回 false ，否则将该车停入车位并返回 true 。
 

// 示例 1：

// 输入：
// ["ParkingSystem", "addCar", "addCar", "addCar", "addCar"]
// [[1, 1, 0], [1], [2], [3], [1]]
// 输出：
// [null, true, true, false, false]

// 解释：
// ParkingSystem parkingSystem = new ParkingSystem(1, 1, 0);
// parkingSystem.addCar(1); // 返回 true ，因为有 1 个空的大车位
// parkingSystem.addCar(2); // 返回 true ，因为有 1 个空的中车位
// parkingSystem.addCar(3); // 返回 false ，因为没有空的小车位
// parkingSystem.addCar(1); // 返回 false ，因为没有空的大车位，唯一一个大车位已经被占据了

// 简单题重拳出击！
var ParkingSystem = function(big, medium, small) {
    this.big = big
    this.medium = medium
    this.small = small
};

/** 
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function(carType) {
    if(carType === 1 && this.big >0){
        this.big-=1
        return true
    }else if(carType === 2&& this.medium >0){
        this.medium-=1
        return true
    }else if(carType === 3&& this.small >0){
        this.small-=1
        return true
    }
    return false
};

// 看看别人的答案 ！！！
var ParkingSystem = function(big, medium, small) {
    this.lot = [big, medium, small]
};

ParkingSystem.prototype.addCar = function(carType) {
    this.lot[carType - 1]--
    return this.lot[carType - 1] >= 0
};

const isRight = (str)=>{
    let _str = /[0-9a-zA-Z]i/
    console.log(_str.test(str))
}
isRight('....')

// 74. 搜索二维矩阵
// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：

// 每行中的整数从左到右按升序排列。
// 每行的第一个整数大于前一行的最后一个整数。
 

// 示例 1：


// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// 输出：true

// 暴力解法
var searchMatrix = function(matrix, target) {
    for(let i =0;i<matrix.length;i++){
        for(let j=0;j<matrix[i].length;j++){
            if(matrix[i][j] === target){
                return true
            }
        }
    }
    return false
}



