// 整个项目的入口文件

import App from './app.js'
import Vue from './vue.js'

new Vue({
    el: '#app',
    commponents: {
        App
    },
    template: `
    <App/>
    `
});