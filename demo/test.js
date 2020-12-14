let res = 'fsdfsfs13021495673vv分身乏术风格工时费'
let f = res.replace( /1(\d{2})\d{4}(\d{4})/g, function () {
    console.log(arguments[0])
    return `<span style="color:red">${arguments[0]}</span>`
})
console.log(f)