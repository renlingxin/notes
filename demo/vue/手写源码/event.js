class eventBus {
    constructor(target) {
        this._event = null
        this.init()
    }
    init() {
        this._event = Object.create(null)
    }
    $on(event, fn) {
        if (Array.isArray(event)) {
            let _tar = this._event[event]
            for (let i = 0, l = _tar.length; i < l - 1; i++) {
                this.$on(event, fn)
            }
        } else {
            ((this._event[event]) || (this._event[event] = [])).push(fn)
        }
    }
    $off(event = null, fn = null) {
        // 如果两个参数都没传 默认清除所有
        if (!event && !fn) {
            this._event = Object.create(null)
        }

        // event支持数组
        if (Array.isArray(event)) {
            for (let i = 0, l = event.length; i < l - 1; i++) {
                this.$off(event[i], fn)
            }
        }

        // 如果绑定的事件没有监听 那么直接结束
        if (!(event in this._event)) {
            console.warn('你触发的这个事件没有绑定')
            return
        }

        // 如果只传了事件名 那么清除该事件名对应的事件数组
        if (event && !fn) {
            this._event[event] = null
        }

        // 如果事件名和回调函数都传了 就要比对一下了

        if (event && fn) {
            let _tar = this._event[event]
            let cd = null,
                i = _tar.length
            while (i-- && i >= 0) {
                cd = _tar[i]
                if (cd === fn) {
                    _tar.splice(i, 1)
                }
            }
        }
    }
    $once(event, fn) {
        function on() {
            this.$off(event, on)
            fn()
        }
        this.$on(event, on)
    }
    $emit(value) {
        let _tarEvent = this._event[value]
        if (!_tarEvent) {
            console.warn('你触发的这个事件没有绑定')
            return
        }
        for (let i = 0, l = _tarEvent.length; i <= l - 1; i++) {
            try {
                _tarEvent[i].apply(this)
                // let _fn = _tarEvent[i]
                // _fn && _fn()
            } catch (err) {
                console.warn(`触发${value}这个事件没成功`)
            }
        }
    }
}