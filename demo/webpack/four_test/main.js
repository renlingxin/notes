import Vue from './vue'
import App from './App'

import {num1,num2,add} from './App'
console.log(num1);
console.log(num2)
add(2,34)
new Vue({
    el: '#app',
    components: {
        App
    },
    template: `
      <App/>
    `
});