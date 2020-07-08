// 启动加载一个App组件
// 1 引入react对象
// 2 引入reactDom对象
// 3 操作jsx
// jsx 不能用+=来运算（不是字符串）
// jsx可以通过数组来输出数据 <div>1</div>
// const arr =[<div>1</div>]
// 4 渲染到指定的元素上
// RTCIceCandidate.render(<arr/>,document.getElment)
// 5 启动 npm run start
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

import {App2} from './App2'


ReactDOM.render( < App2 / > , document.getElementById('root'));




