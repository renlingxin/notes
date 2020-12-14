const { resolve } = require("path");


const time = function (val) {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(val)
            console.log(val)
        }, 2000);
    })

}

function* peropleStatus() {
    yield time,
        yield 'resolve',
            yield 'reject'
    return 'end'
}

let r = peropleStatus()

console.log(r.next())
console.log(r.next())
console.log(r.next())
console.log(r.next())


let res = [1, 2, 4, 33, 42, 4, 2]

async function getimg() {
    for (let i = 0; i < res.length; i++) {
        await time(res[i])
    }
}

getimg()