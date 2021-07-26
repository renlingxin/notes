// 资料 http://blog.yidengxuetang.com/post/202001/07/

class person {
  constructor(props) {
    this.info = {
      name: props.name || "renlingxin",
      age: props.age || 13,
    };
  }
  getName = () => {
    return this.info.name;
  };

  getAge() {
    return this.info.age;
  }
}

let p1 = new person({
  name: "xxxxx",
  age: 43,
});
console.log(p1.getName());
console.log(p1.getAge());

class ani extends person {
  dog = "dog"; //公共实例字段 跟constructor 中 this.name一样
  #times = 0; //这玩意只能在类的正文里访问
  static num = 0
  // constructor 初始化实例的方法
  constructor(props) {
    super(props);
    this.other = {
      sex: props.sex,
      person: props.person,
    };
    ani.num++
    this.#times++;
    // this.update("任岭鑫");
    // console.log(this.gettiem());
    console.log("this.only", ani.num);
  }
  update(val) {
    this.#times = `✨${val}✨`;
  }
  gettiem() {
    return this.#times;
  }
  // 类（class）通过 static 关键字定义静态方法(只能被类操作)。不能在类的实例上调用静态方法，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能。
  static only = 0;

  static getOther = () => {
    // this.only = "fdfdf";
    return this.only;
  };
  getSex = () => {
    return this.other.sex;
  };

  getPerson() {
    return this.other.person;
  }
}

let p2 = new ani({
  name: "houzi",
  age: 4,
  sex: "nv",
  person: "die",
});
let p3 = new ani({
  name: "fdfd",
  age: 34,
  sex: "fd",
  person: "diefd",
});

console.log(ani.getOther(),'ani.getOther()');
// static 定义的字段 能被父类直接调用 实例调不了
console.log(ani.only, p2.only,'ani.only, p2.only');
// 公共实例字段 父类本身不能访问 实例可以访问
console.log(p2.dog, ani.dog,'p2.dog, ani.dog');
// p2.#times ani.#times =》SyntaxError:
// console.log(p2.#times,ani.#times);

console.log(p2.getName());
console.log(p2.getAge());
console.log(p2.getSex());
console.log(p2.getPerson());

// 有点恶心 没搞懂
// 类属性在默认情况下是公共的，可以被外部类检测或修改。在ES2020 实验草案 中，增加了定义私有类字段的能力，写法是使用一个#作为前缀。
class ClassWithPrivateAccessor {
  #message; //这玩意只能在类的正文里访问

  get #decoratedMessage() {
    return `✨${this.#message}✨`;
  }
  set #decoratedMessage(msg) {
    this.#message = msg;
  }

  constructor() {
    this.#decoratedMessage = "hello world";
    console.log(this.#message, this.#decoratedMessage);
  }
}

new ClassWithPrivateAccessor();

// 私有静态字段
// 有时甚至静态字段也是你要隐藏的实现细节。在这方面，你可以将静态字段设为私有。

// 限制实例的个数
class User {
  static #MAX_INSTANCES = 2;
  static #instances = 0;
  name;

  constructor(name) {
    User.#instances++;
    if (User.#instances > User.#MAX_INSTANCES) {
      throw new Error("Unable to create User instance");
    }
    this.name = name;
  }
}

new User("Jon Snow");
let u = new User("Arya Stark");
// console.log(User.#instances,u.#instances)


//   new User('Sansa Stark'); // throws Error


class t {
  // constructor(){

  // }
  // private name:String;
}
