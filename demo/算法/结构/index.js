function _con(target){
    let _res = new List()
    while(target.next){
        let _o = _res
        _o.left = target.value
        _res = _o
        target = target.next
    }
    _b(_res)
}
function _b(List){
    while(List.next){
        console.log(List.value)
        List = List.next
    }
}