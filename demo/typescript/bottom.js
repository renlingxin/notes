// 基本数据类型
// 1. 数组 Array
var arr = [1, 3, 4];
var arr1 = [3, 4];
// 2. 元组 Tulpe
var tulpeArr = [2, "333"];
var x;
x = [1, "eee"];
// 3. 字符串 String
var str = "renlingxin";
// 4. null / undefined
var tar = null;
var unde = undefined;
// 5. 没有任何类型 void
// void 类型只能被 null 和 undefined 赋值
function getVoid() {
    console.log("2222");
}
var _res = undefined;
_res = null;
// 6. 永不存在的值的类型 never
// never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。
// 返回 never 类型的函数必须包含无法到达的终点
function putError() {
    throw new Error("ddd");
}
function putError2() {
    while (true) { }
}
// 7. 数字 number
// ts 中都是浮点数 除了支持 十进制和十六进制 字面量 还支持 ES6 引入的 二进制和八进制 字面量
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
// 8. 任意 any
var _name = 2;
_name = "dsdsd";
var list = [1, 2, 3, "444"];
// 9. 枚举 enum
var people;
(function (people) {
    people[people["ren"] = 0] = "ren";
    people[people["ling"] = 1] = "ling";
    people[people["xin"] = 2] = "xin";
})(people || (people = {}));
var _index = people.ren; // 0
var person;
(function (person) {
    person[person["ren"] = 2] = "ren";
    person[person["ling"] = 5] = "ling";
    person[person["xin"] = 9] = "xin";
})(person || (person = {}));
var _index1 = person.ren; // 2
var str1 = people[2]; // 'ren'
create({ prop: 0 }); // OK
create(null); // OK
// 11 布尔 Boolean
var boo = false;
var boo1 = true;
// 类型断言  => 告诉 ts ‘这个类型我知道你别管’
// 1. <>
var _time = "20200806";
var _tiemLength = _time.length;
// 2. as
var _time1 = "20200806";
var _tiemLength1 = _time.length;
function getNum(target) {
    console.log(target);
}
getNum({ width: "333", area: 222 });
function getNums(target) {
    console.log(target);
}
getNums({ width: "333" });
function getNum1(target) {
    // target.width = "ddd";
}
getNum1({ width: "333", area: 222 });
