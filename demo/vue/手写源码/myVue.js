const compilerUtil = {
    getValue(expr, vm) {
        // console.log(expr.split('.'))
        return expr.split('.').reduce((data, pre) => {
            return data[pre]
        }, vm.$data)
    },
    setValue(expr, vm, newVal) {
        expr.split('.').reduce((data, currentVal) => {
            data[currentVal] = newVal
        }, vm.$data)
    },
    getOtherName(expr, vm) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getValue(args[1], vm)
        })
    },
    text(node, expr, vm) {
        let _value;
        if (expr.indexOf('{{') !== -1) {
            _value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
                new watchter(vm, args[1], () => {
                    this.updateView.testView(node, this.getOtherName(expr, vm))
                })
                return this.getValue(args[1], vm)
            })
        } else {
            _value = this.getValue(expr, vm)
            new watchter(vm, expr, (newVal) => {
                this.updateView.testView(node, newVal)
            })
        }
        this.updateView.testView(node, _value)
    },
    html(node, expr, vm) {
        let _value = this.getValue(expr, vm)
        new watchter(vm, expr, (newVal) => {
            this.updateView.htmlView(node, newVal)
        })
        this.updateView.htmlView(node, _value)
    },
    model(node, expr, vm) {
        const _value = this.getValue(expr, vm)
        // 绑定更新函数   数据 =》 视图
        new watchter(vm, expr, (newVal) => {
            this.updateView.modelView(node, newVal)
        })

        // 视图=》数据=》视图
        node.addEventListener('input', (e) => {
            // console.log(e)
            this.setValue(expr, vm, e.target.value)
        })
        this.updateView.modelView(node, _value)
    },
    on(node, expr, vm, eventName) {
        let fn = vm.$options.methods && vm.$options.methods[expr]
        node.addEventListener(eventName, fn.bind(vm), false)
    },
    updateView: {
        testView(node, value) {
            node.textContent = value
        },
        htmlView(node, value) {
            node.innerHTML = value
        },
        modelView(node, value) {
            node.value = value
        }

    }
}

class compiler {
    constructor(el, vm) {
        window.$vm = vm
        // console.log('el', el)
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        //1 获取文档碎片对象 放入内存中会减少页面的回流和重绘
        let fragElement = this.creatFragment(this.el)
        // console.log(fragElement)
        // 2编译
        this.compiler(fragElement)
        //3 追加 子元素到根元素
        this.el.appendChild(fragElement)

    }
    compiler(frag) {
        let childs = frag.childNodes
        // console.log(childs)
        for (let i = 0; i < childs.length; i++) {
            if (this.isElementNode(childs[i])) {
                // console.log('元素节点', childs[i])
                this.compilerElement(childs[i])
            } else {
                // console.log('文本节点', childs[i])
                this.compilerText(childs[i])
            }
            if (childs[i].childNodes && childs[i].childNodes.length) {
                this.compiler(childs[i])
            }
        }

    }
    // 处理元素节点
    compilerElement(node) {
        const attributes = node.attributes
        // console.log(attributes)
        for (let i = 0; i < attributes.length; i++) {
            // console.log(attributes[i])
            let {
                name,
                value
            } = attributes[i]
            if (this.isDirective(name)) {
                // console.log(value)
                let [, diractive] = name.split('-')
                let [dirName, eventName] = diractive.split(':')
                // 更新视图
                compilerUtil[dirName](node, value, this.vm, eventName)
                // 移除有指令的标签上的属性
                node.removeAttribute('v-' + diractive)

            } else if (this.isEventName(name)) {
                let [, eventName] = name.split('@')
                compilerUtil['on'](node, value, this.vm, eventName)
            }
        }
    }
    // 处理文本节点
    compilerText(node) {
        if (/\{\{(.+?)\}\}/.test(node.textContent)) {
            // console.log(node.textContent)
            compilerUtil['text'](node, node.textContent, this.vm)
        }
    }
    creatFragment(el) {
        // 创建文档碎片
        let f = document.createDocumentFragment()
        let firstchild;
        while (firstchild = el.firstChild) {
            f.appendChild(firstchild)
        }
        return f
    }
    isEventName(name) {
        return name.startsWith('@')
    }
    // 判断属性是否是v-开头
    isDirective(eleName) {
        return eleName.startsWith('v-')
    }
    isElementNode(node) {
        // 判断是否是元素节点 其他情况下是文本节点
        return node.nodeType === 1
    }
}

class myVue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data()
        this.$options = options
        if (this.$el) {
            // 1 实现数据观察者
            new Observer(this.$data)
            // 2 实现指令解析器
            new compiler(this.$el, this)
            // 3 代理 this
            this.proxyData(this.$data)
        }
    }
    proxyData(data) {
        console.log(data)
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newVal) {
                    data[key] = newVal
                }
            })
        }
    }
}