function* peropleStatus(){
    yield 'pending',
    yield 'resolve',
    yield 'reject'
    return 'end'
}

let r = peropleStatus()

console.log(r.next())
console.log(r.next())
console.log(r.next())
console.log(r.next())