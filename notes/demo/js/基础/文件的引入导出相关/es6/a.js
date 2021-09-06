export var age = 23;
export function editAge() {
    age++;
}
export const init = function () {
    handleAddListener('load', function () {
        console.log("页面加载了")
    })
}
export const handleAddListener = function (type, fn) {
    if (window.addEventListener) {
        window.addEventListener(type, fn)
    } else {
        window.attachEvent('on' + type, fn)
    }
}


// export default {
//     age:age,
//     editAge: editAge,
//     init: function () {
//         this.handleAddListener('load', function () {
//             console.log("页面加载了")
//         })
//     },
//     handleAddListener: function (type, fn) {
//         if (window.addEventListener) {
//             window.addEventListener(type, fn)
//         } else {
//             window.attachEvent('on' + type, fn)
//         }
//     }
// }