function name(a) {
    console.log(a())
    var a = 'hello';
    console.log(a)
    function a() {
        console.log(1111)
    }
    console.log(a)
}
name(null);
