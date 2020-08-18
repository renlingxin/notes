let age = 22;

let name = 'renlingxin'

// let person
function setAge() {
    age++
}
function getName(){
    return name
}
module.exports = {
    age: age,
    setAge: setAge,
    getName: getName,
    sayName: function () {
        console.log('name', '任岭鑫')
    }
}