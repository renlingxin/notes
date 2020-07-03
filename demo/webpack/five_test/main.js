import Vue from './node_modules/vue/dist/vue'

// import App from './App'
import App from "./src/app.vue"

import './src/css/public.css'
import './src/css/bag.less'


// let name = 'renlingxin';
// console.log(name)

new Vue({
    el:'#app',
    // 使用render的方式渲染组件
    render:c=>c(App)
    // render:  (createElements, context) => createElements(App)

//     components:{
//         App
//     },
//     template:`
//        <App/>
//    `
});