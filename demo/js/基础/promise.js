
    function a() {
        b().then(res => {
            console.log('res', res)
        })
    }

    function b() {
        return new Promise((resolve, reject) => {
            resolve && resolve(1)
        })
    }
    a()



    async function c() {
        let res = await d()
        console.log('res1', res)
    }

    function d() {
        try {
            console.log(e)
            let e = 0
            // return Promise.resolve(e)
        } catch (err) {
            return Promise.resolve(err)
        }
    }
    c()