// axios 就是一个基于 promise 封装出来的进行 ajax请求的库
// fetch 是浏览器自带的

axios.get("/user").then(res => {
    return axios.get('/getuser');
}).get("/name").then(res => {
    console.log('');
})