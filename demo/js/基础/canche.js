/*
 * @Author: your name
 * @Date: 2021-10-12 14:35:14
 * @LastEditTime: 2021-10-13 15:47:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/demo/js/基础/canche.js
 */
class eventBus {
    constructor(target){
        this._event = {}
    }
    $on(name,fn){
        
        if(this._event[name]){
            this._event[name].push(fn)
        }else{
            this._event[name] = [fn]
        }
    }
    $emit(name){
        console.log(name in this._event,'3333333',this._event.name)
        if(!this._event[name]){
            console.log('未注册的事件')
            return 
        }
        let _emitEvent = this._event[name]

        for(let i=0;i<_emitEvent.length;i++){
            _emitEvent[i] && _emitEvent[i]()
        }
    }
    $once(name,fn){
        const _on = ()=>{
            this.$off(name)
            fn()
        }
        this.$on(name,_on)
    }
    $off(name,fn){
        if(!this._event[name]){
            console.log('未注册的事件')
            return 
        }
        this._event[name] = []
        fn && fn()
    }
}
let g = new eventBus()
g.$on('click-change',()=>{console.log('A --------- JIAN_TING_ZHI_XING_A')})

setTimeout(() => {
    g.$emit('click-change')
}, 2000);

g.$on('click-change',()=>{console.log('B --------- JIAN_TING_ZHI_XING_B')})
