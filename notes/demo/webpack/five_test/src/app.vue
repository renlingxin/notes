<!-- 示例 -->
<template>
    <div>
        {{name}}
         <img :src="imgURL" />
    </div>
</template>

<script>
import imgURL from './img/heart.jpg'
export default {
    data() {
        return {
             name:'renlingxin',
             imgURL:imgURL
        }
    },
    //创建完成（访问当前this实例）
    created() {

    },
    //挂载完成（访问DOM元素）
    mounted() {

    },
    //定义方法
    methods:{

    }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>