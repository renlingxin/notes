function mynew(){
    let constr = Array.prototype.shift.call(arguments)
    let obj = Object.create(constr.prototype)
    let res = constr.apply(obj,arguments)
    return res instanceof Object ? res : obj
}
// mynew(f)


var x =1
function t(a,b=function(){x=2}){
    var x = 3
    b()
    console.log('t',x)
}
t()
console.log('global',x)
