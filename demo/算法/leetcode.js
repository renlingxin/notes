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

// while + 对象 差值法
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


// es6写法   --- map
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
console.log(JSON.stringify(tryTree(_str), null, 2))

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
        console.log('l=>', l)
        console.log('r  =>', r)
        while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) {
            --l;
            ++r;
            ++ans;
        }
    }
    return ans;
};
console.log(countSubstrings('abcaaaaaaa'))