// es6 Module


// 整个项目的入口文件
import Vue from './vue.js'
import App from './App.js'

new Vue({
    el:'#app',
    components:{
        App
    },
    template:`
      <App/>
    `
});