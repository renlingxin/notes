class copyTest{
    constructor({
        btn
    }){
        // super()
        this.install(btn)
        this.btnElement = null
    }
    // 初始化
    install(btn){
        this.btnElement = document.querySelector(btn)
        console.log('btnElement',this.btnElement);
        // vm.$copyText = this.$copyText
    }
    // 复制方法
    $copyText(va){
        let _value = this.btnElement.value || va
        return new Promise((resolve,reject)=>{
            let _input = document.createElement('input')
            _input.value = _value
            document.body.appendChild(_input)
            _input.select()
            document.execCommand("Copy");
            document.body.removeChild(_input)
            resolve()
        })
    }
}