## 一、element-ui 

#### 1. el-table

```javascript
<el-table
 v-loading="showLoading"
 highlight-current-row
></el-table>
```

1 通过添加v-loading数据请求完成之前可以触发‘正在加载’样式，请求完成之后取消样式展示数据；showLoading的值为true 和 false

2 highlight-current-row 添加属性会添加行数据的点击事件
#### 2. append    prepend  （Jquery有相似用法）
```html
// append  slot定位 放在input的最后位置
<Input>
   <Select slot="append">
       <Option></Option>
   </Select>
</Input>
```
```html
// prepend  slot定位 放在input的开始位置
<Input>
   <Select slot="prepend">
       <Option></Option>
   </Select>
</Input>
```
## 二、vue-router
### 在浏览器中创建新窗口打开页面
```javascript
const routerUrl = this.$router.resolve({
    path:'/xxx',
    query:{
       page:1
    }
});
window.open(routerUrl.href,'_blank');
//routerUrl是一个对象属性包括href  location  route等等
```
### window.open(url,name,spaces,replace);
该方法用于打开一个新的浏览器窗口或者查找一个已命名的窗口
name

1. _blank  url加载到新的窗口，默认值
2. _parent url加载到父框架
3. _self url替换当前页面

### 刷新页面获取的参数 发生number=>string的变化

原因是在刷新页面时，路由地址附在参数进行了一次刷新，页面在读取num时当成字符串处理了

解决方法可以通过number()将参数转换为数字
### 动态路由匹配
```javascript
const User = {
   template:'<div></div>'
}
const router = new VueRouter({
   routes:[
      //动态路由参数  以冒号开头
      { path:'/user/:id',component:User}
   ]
})
```
**现在像 /user/foo 以及 /user/bar 都会映射到相同的路由也就是加载User组件**
一个 " 路径参数 " 使用 冒号  ：  标记。当匹配到路由时，参数值会被设置到
 this.$route.params  ,可以在每个组件中使用

```javascript
const User = {
   template:'<div> User : {{ $route.params.id }}</div>'
}
```
**在一个路由中也可以设置多段路径参数**

```javascript
 /user/:name/post:pass    // 模式
 /user/ren/post/123       //匹配路径
 {name:'ren',pass:'123'}  //$route.params
```
#### 注意
在使用路由参数的时候，例如从user/foo 跳转到 user/bar 原来的组件会被复用，因为两个路由渲染同一个组件，跟销毁再创建比起来，复用显得更加高效。**因此，组件的声明周期钩子也就不会再被调用**
###### 可以使用以下两种方式对路由参数的变化作出响应
```javascript
 const User = {
   template:'',
   watch:{
     '$route' (to,from){
        //对路由变化作出响应
     }
 }
 }
```

```javascript
const User = {
  template:'',
  beforeRouteUpdate(to,from,next){
  
  }
}
```

### 路由懒加载,使用resolve模式按需引入，提高代码运行速率

```javascript
{
 path:'/',
 component: resolve => require(['@/components/common/Home.vue'],resolve);
 meta:{title:'首页'}
}
```

### 捕获所有路由或404 Not found 路由
常规参数只会匹配被‘/'隔断的url片段的字符，如果想匹配**任意路径**，我们可以使用 * 
```javascript
{
  path:'*'   // 会匹配所有的路径
}
{
   path:'/user-*'   //会匹配以'user-'开头的任意路径
}
```
当使用通配符路由时，一定要把 * 方法最后，也就是说当用户输入的url与前面的路由配置都没有匹配，那么就会走到 * 路由
```javascript
{
 path:'/',
 component: resolve => require(['@/components/common/Home.vue'],resolve);
 meta:{title:'首页'}
},
{
 path:'/assit/list',
 component: resolve =>require(['@/components/common/list.vue'],resolve);
 meta:{title:'列表'}
},
//在遇到未匹配的路由时会显示404页面
{
 path:'*',
 component:resolve=>require(['@/components/common/404.vue'],resolve);
 meta:{title:'404'}
}
```
### 路由component的引入方式
###### 懒加载
```javascript
{
 path:'*',
 component:resolve=>require(['@/components/common/404.vue'],resolve);
 meta:{title:'404'}
}
```
**使用require这种方式引入的时候，会将component分别打包成不同的js，加载的时候也是按需加载，只用访问这个路由地址的时候才会加载这个js**
###### 非懒加载
```javascript
import List from '@/components/common/list.vue'
{
 path:'/list',
 name:'list',
 component:List
}
```
**采用import引入，当项目打包时路由中的所有component都会打包在一个js中，造成进入首页时，需要加载的内容过多，时间相对较长**

### 路由 - 滚动行为
需求=>使用前端路由时，想要页面滚到顶部，或者是保持原先非滚动位置，就像重新加载页面一样
###### scrollBehavior
```javascript
{
   export default new vueRouter({
     routes:[...],
     scrollBehavior(to,from,savedPosition){
      // return 期望滚动到的哪个位置
      if(savedPosition){
       return savedPosition //在按下 后退/前进 按钮时，就会像浏览器的原生表现一样
      }else{
            return {x:0,y:0}  //对于所有导航路由，简单的让页面滚动到顶部
       }
     }
   })
}
```
**这个功能只在支持 history.pushState 的浏览器中可用** 
scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且当popstate导航（通过浏览器的 前进/后退 按钮触发）时才可用。
```javascript
//模拟滚动到锚点行为
scrollBehavior(to,from,savedPosition){
  if(to.hash){
    return {
       selector:to.hash
     }
  }
}
```
### 编程式导航

```javascript
<router-link :to=" path : ' / ',query:{} ">点击跳转</router-link>
```

```javascript
this.$router.push({ path : ' / index ' , query : {} });
```
##### router.replace
唯一的不同是，他不会向history添加新的记录，而是跟它的方法名一样 ，替换掉当前的history记录
```javascript
//声明式
  <router-link :to="..." replace>
//编程式
router.replace(...)
```
#### 补充
  router.push 、                                router.replace 、                       router.go 
window.history.pushState 、  window.history.replaceState 、 window.history.go

### 路由守卫
##### 全局前置守卫
```javascript
// router.beforeEach
const router = new VueRouter({...});
  router.beforeEach((to,from,next) =>{
      ...
})
```
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫resolve完之前一直处在 **等待中**
####### 参数
to : Route => 即将要进入的目标 路由对象
from : Route => 当前导航正要离开的路由
next : Function => 一定要调用该方法resolove这个钩子，执行效果依赖**next**方法调用参数
  1. next()  进入管道中的下一个钩子
  2. next(false) 中断当前的导航
  3. next( ' / ' )或者 next({ path : ' / ' }) 跳转到一个不同的地址。
##### 全局后置钩子
```javascript
//全局后置钩子 与守卫不同的是 不会接受next函数也不会改变导航本身
router.afterEach((to,from)=>{
...
})
```
#### 路由独享的守卫
```javascript
//与全局前置守卫方法参数一样
const router = new VueRouter({
  routers :[
    {
      path:'/path',
      component:Foo,
      beforeEnter:(to,from,next)=>{
          ...
      }
    }
  ]
})
```
### 组件路由
```javascript
const Foo = {
  template:'...',
  beforeRouteEnter(to,from,next){
     //在渲染该组件的对应路由被confirm前调用
     //不能访问组件实例 'this',因为守卫执行前，组件实例还没有被创建
  },
  beforeRouteUpdate(to,from,next){
     //当前路由改变，但是该组件被复用时调用
     //可以访问组件实例'this'
  },
  beforeRouteLeave(to,from,next){
     //导航离开该组件的对应路由时调用
     //可以访问组件实例'this'
  }
}
//beforeRouterEnter()可以通过传递一个回调给next来访问组件实例
beforeRouterEnter(to,from,next){
	let title = '任岭鑫';
  next(vm=>{
			vm.myTitle = title //myTitle是组件实例中的属性
  })
}
```
### 路由元信息（meta）
```javascript
//定义
{
  path:'/',
  component:Foo,
  meta:{requireAuth:true}
}
//使用
//一个路由匹配到的所有路由记录会暴露为$route对象（还有在导航守卫中的路由对象）的$route.matched数组。因此我们需要遍历$route.matched来检查路由记录中的meta字段
router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.requireAuth)){
  ...
  }
})
```
### vue-router 实现原理

> 参考文章 1 https://zhuanlan.zhihu.com/p/27588422
> 参考文章 2 https://zhuanlan.zhihu.com/p/24574970

#### 单页面
即第一次进入页面的时候会请求一个html文件，刷新清除一下，切换到其他组件，此时路径也发生响应的变化，但是并没有新的html请求，页面内容也变化了。
** 原理是：**
JS会感知到url的变化，通过这一点，可以用js动态的将当前页面的内容清除掉，然后将下一个页面的内容挂载到当前页面上，这个时候的路由不是后端来做了，而是前端来做，判断页面到底是显示哪个组件，清除不需要的，显示需要的组件。这种过程就是单页应用，每次跳转的时候不需要再请求html文件了。
#### 多页面
即每一次跳转的时候，后台服务器都会返回一个新的html文档，这种类型的网站叫多页网站，也叫做多页应用
**原理是：**
传统的页面应用，是用一些超链接来实现页面切换和跳转的
#### vue-router原理
原理核心就是更新视图但不重新请求页面
#### 路由模式 --3 个
* hash 使用了URL hash值来做路由。默认模式
* history 依赖HTML5 History API 和服务器配置。
* abstract 支持所有的 Javascript 运行环境 如Node.js服务器端（通过数组模拟）

**hash**

hash即浏览器url中#后面的内容，包含#。hash是URL中的锚点，代表的是网页中的一个位置，单单改变#后面的部分，浏览器只会加载相应位置的内容，不会重新加载页面。
 也即是说：
* 即#是用来指导浏览器动作的，对服务器端完全没有用，HTTP请求中，不包含#。
* 每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用“后退”按钮，就可以回到上一个位置
**所以hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据**

**History**

HTML5 History API 提供了一种功能，能让开发人员在不刷新页面的情况下修改站点的URL，就是利用history.pushState API来完成URL跳转而无需重新加载页面；
由于hash模式会带着比较不好看的#，所以你可以选择history模式，只需要在配置路由规则的时候，加入‘mode:history’ ,这种模式充分利用了history.pushState API来完成URL的跳转而无需重新加载页面
有时，history模式下也会出问题：
例如:
hash模式下：xxx.com/#/id=5 请求地址为 xxx.com,没有问题。
history模式下：xxx.com/id=5 请求地址为 xxx.com/id=5，如果后端没有对应的路由处理，就会返回404错误；

为了应对这种情况，需要后台配置支持：
在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面

#### web API history
**属性**
length => 返回一个整数，表示会话历史中元素的数目，包括当前加载页。
state => 返回一个表示历史堆栈顶部的状态的值
**方法**
back() => 前往上一页
forward() => 在浏览器记录中前往下一页
go() => 通过当前页面的相对位置从浏览器会话记录中加载页面，可以理解为当前页面为0
pushState() => 按指定名称和url将数据push进会话历史栈，数据被DOM进行了不透明处理
replaceState() => 按指定的数据，名称或url，更新历史栈上最新的入口
**window.onpopstate**
window.onpopstate是popstate事件在window对象上的事件处理程序
如果记录是pushstate或replacestate操作过的,onpopstate会包含一个拷贝
每当处于激活状态的历史记录发生变化时，window.onpopstate触发；history.replacestate和history.pushstate不会触发window.onpopstate;前进后退等行为会触发;

## 三、vue-常用API

### provide / inject 组合

**场景**  
在处理列表时，常常有删除一条数据或者新增数据之后需要重新刷新当前页面的需求
**遇到的问题**
 1）用vue-router重新路由到当前的页面，页面时不进行刷新的
 2）采用window.reload（），或者router.go（0）刷新时，整个浏览器进行了重新加载，闪烁，体验不好
**解决方法**
provide / inject 组合
**作用**
允许一个祖先组件向其所有的子孙后代注入一个依赖，不论组件层次多深，并在上下游关系成立的时间始终生效。
**Home配置**

```javascript
<template>
   <div><router-view v-if="isShow"> </router-view></div>   
</template>
<script>
export default {
  name:'app',
  provide(){
    return {
       reload:this.reload
    }
  },
  data(){
     return{
       isShow:true
     }
  },
  methods(){
    reload(){
      this.isShow = false;
      //该方法会在DOM更新后执行（在数据变化之后等待Vue完成DOM更新，可以在数据变化之后立即使用它）在页面刷新完成 执行完mounted之后立即显示
        this.$nextTick(function(){
        	this.isShow = true
        })
      }
  }
}
</script>
```
**使用reload方法的页面**
```javascript
export default {
  inject :['reload'],   //注入reload方法
  data(){...},
  methods(){
    getList(){
      this.$axios.get('/list')
      .then((res)=>{
      ...
      this.reload();   //调用刷新方法
      })
      .catch(){console.log}
    }
  }
}
```

### router-link中的tag属性
```javascript
//能将标签渲染成预想的 例如 'li'
<router-link :to="{path:''}" tag='li'>任岭鑫</router-link>
<li>任岭鑫</li>
```

### v-if v-show 的区别
```javascript
v-if 会销毁并重建DOM元素
v-show 通过设置display:none属性来控制当前元素的显示与隐藏
//扩展
display:none => 不占据当前DOM的结构位置
visibility:hidden => 在当前页面中依然占据结构位置

```
### 全局API

####  1. Vue.extend --- 扩展
使用基础的Vue构造器，创建一个子类，参数是一个包含组件选项的对象 也就是建造一个小的组件

通过extend构建的组件 data 必须是函数

**官方示例**
```html
<div id="mount-point"></div>
```

```javascript
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')

```


#### 2. vue-directive  ---   自定义指令 
**全局注册**
```javascript
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
**局部使用**
```javascript
directives: {
  focus: {
    //局部 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
//调用
<input v-focus>
```

#### 3. this.$nextTick()

**为什么使用**
在获取数据后，需要对新视图进行下一步操作或者其他操作时，发现获取不到DOM，因为赋值操作只完成了数据模型的改变并没有完成视图更新。就是无法再次触发DOM 更新。

在vue生命周期的created钩子函数进行的DOM操作一定要放在nextTick的回调函数中
在created中执行的时候DOM并没有执行任何渲染，此时进行的DOM操作都是没有意义的，所以此处的DOM操作代码放进nextTick的回调函数中，与之对应的就是mounted。
**nextTick执行是在mounted生命周期之后**

```javascript
export default {
  name:'index',
  data(){....},
  created(){
  	 console.log(11111)
     this.$nextTick({
       console.log(22222)
     })
  },
  mounted(){
    console.log(33333);
    this.$nextTick({
    console.log(44444)
    })
  }
}
//输出结果：
11111
33333
22222
44444
```
#### 4. Vue.set   向响应对象中添加响应key

Vue.set( target, propertyName/index, value )
**参数：**
target => 目标对象
propertyName/index => 属性名或index
value => 内容

向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')

#### 5. Vue.delete  删除响应对象中key和Vue.set对应

Vue.delete( target, propertyName/index ) 
**参数：**
target => 目标对象
propertyName/index => 属性名或index

删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。

#### 6. Vue.filter 注册全局过滤器

**官方示例**
```javascript
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
```

## 四、vue-cli 脚手架
### vue-cli 3 . 4 使用
```javascript
//安装
vue install -g @vue/cli
//查看安装版本
vue --version
//图形化创建项目界面
vue ui
//手动创建项目
vue create 项目名
//本地运行项目
npm run serve
//打包文件
npm run build
```

**二次运行 npm run build 会先把旧有的dist文件夹删除，然后重新生成dist文件夹**

## 五、 vuex 状态管理
**vuex是状态管理模式** 它采用集中式存储管理应用的所有组件的状态 
这个状态管理应用包含以下几个部分
1. state 驱动应用的数据源
2. view 以声明方式将state映射到视图
3. actions 响应在view上的用户输入导致的状态变化
```javascript
const store  = new Vuex.Store({
  state:{
     count: 0
  },
  mutations:{
   increment (state){
      state.count++
   }
  }
})
//store.state 来获取状态对象 store.commit方法触发状态变更
store.commit('increment');
console.log(store.state.count)  // 1 
```
**扩展--vue-devTools**
base state   ->基础state
payload       ->载荷（个人理解:传递的有效参数）

**vue-cli使用**
```javascript
import Vue from 'vue'
//1 引入vuex对象
import Vuex from 'vuex'
//2 安装使用插件
Vue.use(Vuex)
//3 创建stroe对象 -- 导出并创建
export default new Vuex.Store({
  //配置数据源
  state:{
			num: 11,
      name: 'renlingxin'
  },
  //获取
  getters:{
        getName(state) {
            return state.name
        },
        getMyNum(state) {
            return state.num
        },
        getAge(state) {
            return state.age
        }
  },
  //更改
  mutations:{
        // 自增
        addNum(state) {
            state.num++;
        },
        // 添加一定数量
        addBynum(state, data) {
            state.num += data
        },
        // 异步添加 --- mutations对state的操作只能是同步的
        // addBynumAsync(state, num) {
        //   // 会导致丢失添加记录
        //   setTimeout(() => {
        //     state.num += num
        //   }, 0);
        // }
        addProps(state, age) {
            // Object.defineProperty  实现响应式（双向数据绑定）
            // state.age = age
            if (!state.age) {
                // 手动实现响应式
                Vue.set(state, 'age', age)
            } else {
                state.age = age
            }
        }
  }
  //actions中可以包含异步行为
  actions:{
        addBynumAction({ commit }, num) {
            setTimeout(() => {
                commit('addBynum', num)
            }, 0);
        },
        addProps({ commit }, age) {
            commit('addProps', age)
        }
  },
  // 出现同名函数或变量的时候，为了保护其不被覆盖，在文档中还有命名空间的概念
  modules: {
  
  }
})
```
### vuex五大将
#### --state--
单一状态树 --- 也就是用一个对象就包含了全部的应用层级状态，以便他作为唯一的数据源存在
** 1 直接获取  -- vuex中state中的数据 --- 可以用，但是不建议**
```javascript
{{ $store.state.num }} 
```
**2 辅助函数  --  mapState **
```javascript
import { mapState } from 'vuex'
 // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
       name : state => state.name
  })
```
#### --getters--
获取state中的数据，可以认为是store的计算属性
**1 函数获取 --- getters**
```javascript
//getters结合computed使用 --- 实时的映射出state的变化
  computed: {
     getMyName() {
       return this.$store.getters.getName;
     },
     getMyNum() {
       return this.$store.getters.getMyNum;
     }
  }
```
**2 辅助函数 --- mapGetters**
```javascript
import { mapGetters } from "vuex";
  computed: {
    // 使用展开运算符 将一个对象变为多个key和value
    ...mapGetters([
      "getMyName", //getters中的key
      "getMyNum",
      "getAge"
    ])
}
//页面中使用
{{getMyName}} {{getMyNum}} {{getAge}}
```
**可以通过让getter返回一个函数，来实现给getter传参----应用于数组查询**
```javascript
getters: {
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
//使用 1 直接使用
{{$store.getters.getTodoById(2)}}
//使用 2 配合computed
  computed: {
    ...mapGetters([
      "getMyName", 
    ])
}
{{getTodoById(2)}}
```
#### --mutations--
更改vuex的store中的状态的唯一方法是提交mutation.
**mutations中只能包含同步操作**
**1 -- 基本使用 --- commit**
```javascript
mutations:{
   //在这里data是mutations的载荷，即需要传入的参数
   //addNum  名字可以采用ADD_NUM常量的方式命名，这对多人协作大有意义
   addNum(state,data){
     state.num += data;
   }
}
//使用
this.$store.commit('addNum',20);
```
**2 -- 载荷在大多数情况下推荐使用对象格式 这样可以包含多个字段并且记录的mutation更加易读**
```javascript
mutations:{
   addNum(state,data){
     state.num += data.one;
   }
}
//使用
this.$store.commit('addNum',{
   one:20
});
```
**3 -- 辅助函数 --- mapMutations**
```javascript
import { mapMutations } from 'vuex'
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 给mutations中的函数起个别名
    })
}
```
#### --actions--
**actions类似于mutations，两者的不同之处在于 1 action提交的是mutations，而不是直接的变更state 2 actions中可以包含异步操作**

**1 基本使用 --- dispatch**
```javascript
   mutations: {
        // 添加一定数量
        addBynum(state, data) {
            state.num += data
        }
  },
   actions: {
        addBynumAction({ commit }, num) {
            setTimeout(() => {
                commit('addBynum', num)
            }, 0);
        }
   }
//页面中使用
this.$store.dispatch("addBynumAction", 30);
```
**2 辅助函数 --- mapActions**
```javascript
import { mapActions } from 'vuex'
methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' //起个别名
    })
  }
```
**3 actions中的异步行为**
```javascript
//	配置异步promise
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
//使用
store.dispatch('actionA').then(() => {
})
//在另一个actions中使用
actions: {
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
#### --module--

```javascript
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
},
const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}
const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
**命名空间**
如果希望模块具有更高的封装度以及复用性，可以通过namespaced:true的方式使其成为带命名空间的模块，当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
**添加命名属性后，五大将的调用方式**
```javascript
//store 中的 index 配置
 modules: {
    // 一般情况下不会影响使用，所有的行为都是大家的
    a: module2,
    b: module1
}
//直接调用
{{ $store.state.b.person }}
//getters比较特殊
{{$store.getters['b/getPerson']}}
//辅助函数
 ...mapGetters('b',[
      "getPerson",    
])
//mutations 和 actions
this.$store.commit('b/change')
this.$store.dispatch("b/addBynumAction", 30);
```
#### --扩展 -- 1严格模式
开启严格模式，只需在创建store的时候传入 strict:true
```javascript
const store = new Vuex.Store({
  // ...
  strict: true
})
```
**发布环境禁止使用严格模式**
#### --扩展 -- 2 state添加属性
```javascript
    addProps(state, age) {
            // Object.defineProperty  实现响应式（双向数据绑定）
            // state.age = age  --- 使用这中方式不能添加成功
            if (!state.age) {
                // 手动实现响应式
                Vue.set(state, 'age', age)  //1 操作的对象 2 属性 3 属性值
            } else {
                state.age = age
            }
    }

```

## 六、 服务端渲染 （SSR Server Site Render）

### Nuxt.js
* 服务器端渲染：根据请求的URL，动态的将模版与数据结合，并响应给客户端
* 简而言之，Nuxt.js是帮助Vue.js轻松完成服务器端渲染工作的框架。Nuxt.js预设了服务器端所需要的各种配置，如异步数据，中间件，路由。
* 三大框架全家桶的一部分(服务器端渲染) React --- Next.js   Angular --- Augular Universal
* 解决SEO的问题，当百度搜索引擎爬虫爬取的时候，通过URL产生对服务器的请求，服务器的根据URL,响应页面，因此百度就获得到了我们的站点数据。
* 前言 ：nuxt 前端沿用了history模式，通过pushState更改URL，进而局部渲染组件
* 而首屏刷新的时候，通过后端计算并模版渲染，在将html响应给客户端，一定程度上解决了首屏白屏问题。  

**使用**
* 触发刷新的时候，地址栏回车或者和URL改变，服务端渲染
* 点击nuxt-link组件，点击a标签，禁止a标签的页面跳转，并根据href属性，通过history.pushState改变地址栏，并发起请求或者具体的客户端渲染行为，局部替换内容

Assets --- 需要编译的资源文件less,js,css

Components --- 公共组件

Layouts --- 头体底 组件

middleware --- 应用过程中发生的事

pages --- 路由页面

plugins --- main.js中安装的插件

static --- 不需要编译，管理缓存问题的资源文件

store --- Vuex

关于部署
1. npm run build
2. cd  . / nuxt / dist
3. 配置package.json 文件，scripts 添加一项 start-spa : ' nuxt start --spa '
4. 服务器端渲染 npm run start ( run可以省略 )
5. 单页应用 npm run start-spa

## 七、扩展
vue组件之间通信方式 ： https://segmentfault.com/a/1190000019208626

## 八、vue 中的 style
### 深度作用选择器 ' >>> ' === ' /deep/ ' === ' ::v-deep '
想要在设置了scoped属性的组件，使样式能处理到最深的层次，可以使用 ‘ >>> ’
因为有的Sass无法解析‘ >>> ’,可以使用 ' /deep/ '  或 ' ::v-deep '替代
```css
<style scoped>
.a >>> .b { /* ... */ }
</style>
//上面的代码会被编译为
.a[data-v-f3f3eg9] .b { /* ... */ }
```



## 九、vue2 中的一些bug


```javascript

//template
<template>
{{ obj.name }}----{{ arr }}
</template>

//data
data: {
      obj: {
        name: 'res'
      },
      arr: ['name', { name: '111' }],
}

//methods

update(){
      // 数组问题  
      
      //数组清空
      this.arr.length = 0;
      console.log(this.arr);//监听不到
      // 手动刷新
      this.arr.__ob__.dep.notify() //响应式元素上的__ob__ 绑定着当前元素的observer 我们可以手动让dep通知watcher更新;
      
      
      //数组对象中的修改 
      this.arr[1].name = 222;
      console.log(this.arr);//可以监听 源码中对数组中的对象进行了和对象一样的深度响应式处理
      
      //数组修改
      this.arr[0] = '111111';
      console.log(this.arr);//监听不到 object.defineproperty 无法操作数组
      
      // 数组新增
      this.arr[1] = 'fdfsdf';
      console.log(this.arr);//监听不到 object.defineproperty 无法操作数组

      // 对象问题
      delete this.obj.name;
      this.obj.age = '111'
      console.log(this.obj);//监听不到  object.defineproperty 只能对set get 进行拦截 对其他状态是无感的
}

```

## 十、通过model属性指定接收属性名以及响应名

```javascript
 {
    model: {
      prop: 'v', // default: value
      event: 'i', // default: input
    },
    props: {
      v: Number,
    },
    data() {
      return {
        count: this.v,
      };
    },
    mothods:{
      push(){
        this.$emit('i', ++count);
      }
    }
 }

```
## 十一、v-bind.sync 

```javascript
//对某一个 prop 进行“双向绑定”

//父组件中引用
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
//上面缩写为.sync
<ChildComponent :title.sync="pageTitle" />

//在子组件中响应
this.$emit('update:title', newValue)

```

## vu2 源码目录

compiler =》编译相关
core - components =》 内置组件
instance =》 渲染的辅助函数
platform =》 平台渲染相关（web weex）
server =》 服务端渲染相关
sfc =》 解析器把vue 文件编译成对象

