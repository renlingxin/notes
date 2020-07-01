const obj = {
    "name":"renlingxin",
    "age":11,
    "color":[1,2,3]
}
console.log(obj)
console.log(JSON.stringify(obj))
// JSON.stringify  的第二个参数
console.log(JSON.stringify(obj,['name','age']))
console.log(JSON.stringify(obj,(key,value)=>{
    if(typeof value === 'string'){
        return undefined
    }
    return value
}))
// JSON.stringify  的第三个参数  间隔的空格数
console.log(JSON.stringify(obj,['name','age'],5))
console.log(JSON.stringify(obj,(key,value)=>{
    if(typeof value === 'string'){
        return undefined
    }
    return value
}))
console.log(JSON.stringify(obj,['name','age'],'*'))
let _res = JSON.stringify(obj,(key,value)=>{

    if(typeof value === 'string'){
        return undefined
    }
    return value
})
console.log(_res)