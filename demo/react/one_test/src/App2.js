import React, {
    Component
} from 'react';

// 默认导出
// export default App2
// 声明并且导出
export class App2 extends Component {
    componentDidMount(){
        // 数据已经装载，据网上说可能会引起二次render
        // 实际应用发网络请求
        console.log('4:componentDidMount钩子函数');
    }
    componentWillMount(){
        // 官方不推荐在此处发请求，可能会造成渲染的阻塞
        console.log('2:componentWillMount钩子函数');
    }
    componentWillUpdate(){
        console.log('componentwillupdate数据将要更改  钩子函数')
    }
    componentDidUpdate(){
        console.log('componentDidUpdate数据已经更改 钩子函数')
    }
    constructor() {
        console.log('1:constructor钩子函数')
        super();
        // 存放数据
        this.state = {
            num : 'renlingxin'
        }
        // 初始化函数的指向 
        this.changehandler= this.changehandler.bind(this);
    }
    changehandler(e){
        console.log(e.target.value)
        console.log(this)  //此处输出的是undefined  =》 更为严谨的浏览器this指向
        this.setState({
            num : e.target.value
        })
    }
    render() {
        // 对数据进行渲染过滤
        console.log('3:render钩子函数')
        return( 
            <div>
                <span>{this.state.num}</span>
                <input type="text" value={this.state.num} onChange={this.changehandler}></input>
            </div>
        )
    }
}