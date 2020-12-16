class copyTest{
    constructor(){
        // super()

    }
    // 初始化
    install(vm,btn){
        // vm.$copyText = this.$copyText
    }
    // 复制方法
    $copyText(va){
        return new Promise((resolve,reject)=>{
            let _input = document.createElement('input')
            _input.value = va
            document.body.appendChild(_input)
            _input.select()
            document.execCommand("Copy");
            document.body.removeChild(_input)
            resolve()
        })
    }
}