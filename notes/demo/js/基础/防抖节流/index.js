// 函数防抖(debounce)
// 概念： 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// 生活中的实例： 如果有人进电梯（触发事件），那电梯将在10秒钟后出发（执行事件监听器），这时如果又有人进电梯了（在10秒内再次触发该事件），我们又得等10秒再出发（重新计时）。


function debounce(fn, wait) {
    let _t = null
    return () => {
        if (_t) {
            console.log('清空');
            clearTimeout(_t)
        }
        _t = setTimeout(() => {
            fn && fn()
        }, wait)
    }
}
// 1 种情况
let y = debounce(()=>{ console.log('rrrrrrr')},500)

setInterval(() => {
    y();
}, 1000);
// 第一次1500秒后输出  之后都是1000秒

// 2 种情况
let y1 = debounce(()=>{ console.log('rrrrrrr')},2000)

setInterval(() => {
    y2();
}, 1000);
// 一次都执行不了  因为每次想执行的时候都被清除了

// 3 种情况
let y2 = debounce(()=>{ console.log('rrrrrrr')},500)

setInterval(() => {
    y2();
}, 200);
// 一次都执行不了  因为每次想执行的时候都被清除了

// 函数节流(throttle)
// 概念： 规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
// 生活中的实例： 我们知道目前的一种说法是当 1 秒内连续播放 24 张以上的图片时，在人眼的视觉中就会形成一个连贯的动画，所以在电影的播放（以前是，现在不知道）中基本是以每秒 24 张的速度播放的，为什么不 100 张或更多是因为 24 张就可以满足人类视觉需求的时候，100 张就会显得很浪费资源。

function throttle(fn, wait) {
    let _last = null
    return () => {
        let _new = + new Date()
        if(_new - _last > wait  || !_last){
            fn && fn()
            _last = _new
        }
    }
}
// 1 种情况
let t = throttle(()=>{ console.log('~~~~~~~~~~~~')},2000)

setInterval(() => {
    t && t()
}, 100);