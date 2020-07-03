var app = {
    template:`
    <div>我是第一个成功的全局组件</div>
    `
};
// 声明并且导出
export var num1 = 1;
// 声明再导出
var num2 = 2;
export {num2};
// 导出函数
export function add(x,y){
    console.log(x,y)
}

   

export default app;