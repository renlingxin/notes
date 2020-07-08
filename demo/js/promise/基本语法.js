// promise     是为了解决（回调地狱）的问题
// 回调地狱  跟以前的if条件地狱很像
// if(){
//     if(){
//         if(){
//             if(){

//             }
//         }
//     }
// }
// 把异步操作封装在一个promise对象中
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('renlingxin');
            // 其实异步逻辑到这里其实已经执行完毕了
            // 就可以告诉外界，可以执行其他操作了
            // 如何告诉外界
            resolve();
        }, 1000);
    })
}
// 调用这个函数，执行了异步操作，但是存在问题，并不知道异步操作什么时候结束
fn().then(res => {
    console.log('下一步');

    fn().then(res => {
        
        console.log('第二步');

    });

});


