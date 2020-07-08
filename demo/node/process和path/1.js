// process => 进程 对象是一个全局变量，它提供有关当前 Node.js 进程的信息并对其进行控制。 作为一个全局变量，它始终可供 Node.js 应用程序使用，无需使用 require()。
console.log(process.env);//process.env  环境变量


let stu = process.env.MYTEXT;
if (stu === 'renlingxin'){
    console.log('有这个环境变量，是本人没错了')
}else{
    console.log('不是本人')
}
// 应用场景我们同样运行一个项目，但是在你的本机和真实的服务器上应该有所区别
// 例如   本地项目可以一堆的log   服务器上不行