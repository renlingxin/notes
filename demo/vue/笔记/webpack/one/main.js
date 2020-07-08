// 整个项目的入口文件

import App from './App.js';
import Vue from './vue.js/index.js';

new Vue({
    el: '#app',
    component: {
        App
    },
    template: `
       <App/>
      `
});