// 批量处理代理
const define = (arr,tar,vm) => {
    console.log(arr,tar)
    arr.forEach(ele => {
        Object.defineProperty(vm, ele, {
            get() {
                return tar[ele]
            }
        })  
    })
}