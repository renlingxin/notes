cocos creator


API 文档接口 => https://docs.cocos.com/creator/api/zh/

### 特性
1. 组件化和数据驱动
- 分类数据与功能
- 给予美术策划直接生产和管理内容的能力
- 解放程序员 只定义脚本等框架内容 具体内容不负责 可以由编辑器完成

### UI系统
1. widget  => 对齐挂件 相较于 父元素的定位关系 用来适配不同设备

### 装饰器 属性声明
官方文档：https://docs.cocos.com/creator/manual/zh/scripting/typescript.html?h=property
属性声明 --- 原文链接： https://cloud.tencent.com/developer/article/1504836
官方文档 --- 节点类型 : https://docs.cocos.com/creator/api/zh/modules/cc.html

```javascript

const {ccclass, property} = cc._decorator; // 从 cc._decorator 命名空间中引入 ccclass 和 property 两个装饰器

@ccclass // 使用装饰器声明 CCClass
export default class NewClass extends cc.Component { // ES6 Class 声明语法，继承 cc.Component

    @property(cc.Label)     // 使用 property 装饰器声明属性，括号里是属性类型，装饰器里的类型声明主要用于编辑器展示
    label: cc.Label = null; // 这里是 TypeScript 用来声明变量类型的写法，冒号后面是属性类型，等号后面是默认值

    // 也可以使用完整属性定义格式
    @property({
        visible: false
    })
    text: string = 'hello';

    // 成员方法
    onLoad() {
        // init logic
    }
}

```


```javascript

@property({
    type: cc.Node, //类型
    displayName: "底座", //属性名
    tooltip: "底部炮台的父节点" //属性提示说明
})
baseNode: cc.Node = null;

```
### 常用节点属性 (cc.某某某)
1. Texture2D 该类允许从图像或原始数据轻松创建OpenGL或画布2D纹理。
2. Sprite 用于在场景中渲染精灵
3. Node  Cocos Creator 场景中的所有节点类。
4. AudioClip 音频资源类
5. Prefab 预制资源类
6. 


### 常用API
1. cc.instantiate 克隆指定的任意类型的对象
2. setAnimation 设置当前动画
```javascript
              trackIndex => Number
              name => String
              loop => Boolean
```
3. Node.getComponent()
获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空
```javascript
hand.getComponent(sp.Skeleton)//获取骨骼动画
```
4. scheduleOnce  调度一个只运行一次的回调函数，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
```javascript
  var timeCallback = function (dt) {
    cc.log("time: " + dt);
  }
  this.scheduleOnce(timeCallback, 2);
```

5. On 设置监听事件 off 删除监听事件

```javascript
this.q.xx_.on(
     cc.Node.EventType.TOUCH_START,//事件类型
     this.q.methods, //回调函数
     this.q,//对象
     false//冒泡阶段 捕获阶段
);
cc.Node.EventType.TOUCH_START // 按下时事件
cc.Node.EventType.TOUCH_MOVE // 按住移动后事件
cc.Node.EventType.TOUCH_END // 按下后松开后事件
cc.Node.EventType.TOUCH_CANCEL // 按下取消事件
```


### 编辑器

资料 => https://cloud.tencent.com/developer/article/1504568

```javascript
//vscode 用户设置中加入这行代码 隐藏cocos生成的meta文件
"files.exclude": {
    "**/*.meta": true
}

```



