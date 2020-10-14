### react脚手架
###### 下载
```
 npm install -g creat-react-app
```
###### 使用
```
   creat-react-app 项目名     // 构建项目结构
   cd 项目目录    npm i       // 安装项目依赖包
```
###### 运行
```
  npm run start     //启动
  npm run build     //生成dist 打包
```

### react reactDom

```javascript
  //这是一个 react 入口文件
  import React from 'react' //提供API 负责逻辑 数据控制
  import ReactDOM from 'react-dom' //渲染视图

  ReactDOM.render(
    <Provider store={store}>
      <HotRoutes />
    </Provider>,
    document.getElementById('root'),
  )

```

### jsx

官网介绍：
它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。JSX 可以生成 React “元素”

```javascript
export default class app extends Component {
  getname(){
      return '任岭鑫'
  }
  render(){
      const name = 'renling'
      const html = '<p>描述</p>'
      const src = './image'
      return(
          <div>
          {/*表达式*/}
          <h1>{name}</h1>
          <h1>{this.getname()}</h1>
          {/*属性的写法*/}
          <img src={src} style={{width:"200px"}}>
          {/*jsx也可以直接当成是表达式*/}
          {html}
          {/*只要是js表达式都可以放在{}里面*/}
          <div>
      )
  }
}

```

**JSX 防止注入攻击**

```javascript
//你可以安全地在 JSX 当中插入用户输入内容：
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```
React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。

### 组件

1. 函数式组件

```javascript

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

```



2. class 组件

```javascript

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

```

3. 示例 + props

```javascript
// 子组件
// 函数类型组件
import React from 'react';

export default function (props) {
  const { title, renderTitle, renderContent } = props;
  const _title = title || renderTitle();
  const userInfo = { name: '奥特曼', age: 222, sex: 34 };
  // 实现 作用域插槽 renderContent
  const content = renderContent ? renderContent(userInfo) : (
    <div>
      <p>姓名{userInfo.name}</p>
      <p>年龄{userInfo.age}</p>
      <p>sex{userInfo.sex}</p>
    </div>
  )
  return (
    <div className="card">
      <div className="card__title">
        <span>{_title}</span>
      </div>
      <div className="card__body">
        {/** 每个组件都可以获取到 props.children。它包含组件的开始标签和结束标签之间的内容 */}
        {props.children}
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}

```

```javascript
//父组件
export default class app extends Component {
  render() {
    return (
      <div className="page">
        <Card
          renderTitle={() => <span>我是你意想不到的结局</span>}
          renderContent={userInfo => (
            <div>
              我是在父组件定义的作用域插槽
              <p>姓名{userInfo.name}</p>
              <p>年龄{userInfo.age}</p>
            </div>
          )}
        >
          <div>我是中间的内容</div>
        </Card>
        <div>
          <Button onClick={this.onClickSend}>发送</Button>
        </div>
      </div>
    );
  }
}

```
### 生命周期

推荐链接 > https://www.jianshu.com/p/b331d0e4b398
```javascript
import React, {
    Component
} from 'react';

// 声明并且导出
export class App2 extends Component {    
    constructor() {
        console.log('1:constructor钩子函数')
        super();
    }
    componentWillMount(){
        // 一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。
        console.log('2:componentWillMount钩子函数');
    }
    componentDidMount(){
        // dom、数据已经装载，一般在这请求接口
        console.log('4:componentDidMount钩子函数');
    }
    componentWillUnmount(){
        // 组件销毁
    }
    componentWillReceiveProps(nextProps){
    // 在接受父组件改变后的props需要重新渲染组件时用到的比较多
    }
    shouldComponentUpdate(nextProps,nextState){
    // 用于控制组件渲染的声明周期   setState 后组件重新渲染 在这里return false 可以组织更新
    }
    componentWillUpdate(nextProps,nextState){
        // shouldComponentUpdate 为true 后 进到这里
        console.log('componentwillupdate数据将要更改  钩子函数')
    }
    componentDidUpdate(prevProps,prevState){
        //组件渲染第一次会进到componentDidMount 之后的更新会进入到这里 prevProps prevState更新之前的数据
        console.log('componentDidUpdate数据已经更改 钩子函数')
    }
    render() {
        // 对数据进行渲染过滤
        console.log('3:render钩子函数')
        return( 
            <div>
            </div>
        )
    }
}
```














