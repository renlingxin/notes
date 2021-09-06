## vue 3 学习笔记

#### 一、v-model

v-model 是 v-bind （属性绑定）和 v-on （事件绑定）的语法糖函数 ;vue2和react本身都是单向数据流绑定；然而在vue中我们可以通过v-model实现视图和数据的双向绑定；其原理就是通过绑定事件监听视图层变化；在vue2 中 默认值分别为 value 和 input

```javascript
//<input :value="obj.value" @input="onchange"/>

let obj = {value:''};

function onchange(e){
  obj.value = e.target.value;
}

```

在vue3中 默认的响应属性名是modelValue  默认的响应事件 update:modelValue ;并且我们可以自定义属性名

```vue

<template>
    <swipe v-model:first="srv" v-model:two="two"></swipe>
</template>

<script>
import swipe from "./swipe";
export default {
  components: {
    swipe,
  },
  data(){
    return {
      srv: 111,
      two: 222
    }
  }
};
</script>

```
```vue

<template>
     {{ first }}-----{{ two }}
    <button @click="updateOne">改变one</button>
    <button @click="updateTwo">改变two</button>
</template>
<script>
export default {
  props: {
    first: Number,//默认的响应属性名是modelValue
    two: Number,
  },
  name: "swipe",
  methods: {
    updateOne() {
      // update:modelValue 默认的响应事件
      this.$emit("update:first", 333333);
    },
    updateTwo() {
      this.$emit("update:two", 444444);
    },
  },
};

```

#### 一、v-model

