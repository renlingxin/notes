import React, {
    Component
} from 'react';

// 默认导出
// export default App2
// 声明并且导出
export class App2 extends Component {
        
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