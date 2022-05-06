class watchter {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 先把旧值存储起来
    this.oldVal = this.getOldValue();
  }
  getOldValue() {
    Dep.target = this;
    const old = compilerUtil.getValue(this.expr, this.vm);
    Dep.target = null;
    return old;
  }
  update() {
    const newVal = compilerUtil.getValue(this.expr, this.vm);
    if (newVal !== this.oldVal) {
      this.cb(newVal);
    }
  }
}
class Dep {
  constructor() {
    this.subs = [];
  }
  // 收集观察者
  addSubs(watchter) {
    this.subs.push(watchter);
  }
  // 通知观察者去更新
  notify() {
    console.log("通知了观察者", this.subs);
    this.subs.forEach((w) => w.update());
  }
}

class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (data && data instanceof Object) {
      Object.keys(data).forEach((key) => {
        this.isdefinePropertys(data, key, data[key]);
      });
    }
  }
  isdefinePropertys(obj, key, value) {
    this.observer(value);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        Dep.target && dep.addSubs(Dep.target);
        return value;
      },
      set: (newVal) => {
        this.observer(newVal);
        if (newVal !== value) {
          value = newVal;
        }
        // 通知Dep变化
        dep.notify();
      },
    });
  }
}
