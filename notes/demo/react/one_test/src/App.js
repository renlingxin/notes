// 1 使用jsx的时候必须引入React
// 2 组件要继承React.component
import React, {
  Component
} from 'react';
class App extends Component {
  // 构造器
  constructor(){
    super();
    this.state = {
      num : 11111,
      inputValue:'我是输入框默认的内容'
    }
 }
 changeHandler(e){
    //  console.log(e)
    // 获取当前input的实时数据
    console.log(e.target.value)
    // this.state.inputValue = e.target.value;
    // 通知视图更新 与vue不同的是需要 自己通过setState手动通知状态改变 类似于小程序的setData
    this.setState({
      inputValue:e.target.value
    })
 }
  // 指定render内容，页面结构
  render() {
    // 也要保证一个根节点
    return (
      <div>
        大家好，我是任岭鑫的第一个react
        <hr />
        {this.state.num}
        <hr />
        {this.state.inputValue}
        <hr />
        <input type="text" value={this.state.inputValue} onChange={ (e)=>{this.changeHandler(e) } }  />
      </div>
    );
  }
}



export default App;