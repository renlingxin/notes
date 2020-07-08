function insertBefore(arr, refItem, newItem) {
    var idx = arr.indexOf(refItem);
    arr.splice(idx, 0, newItem);
}

function moveItem(arr, refItem, itemToMove) {
var idxOfMove = arr.indexOf(itemToMove);
arr.splice(idxOfMove, 1);
var idxRef = arr.indexOf(refItem);
arr.splice(idxRef, 0, itemToMove);
}

function addItems(arr, ownerArr, startIdx, endIdx) {
for (; startIdx <= endIdx; startIdx++) {
    arr.splice(-1, 0, ownerArr[startIdx]);
}
}

function removeItems(arr, ownerArr, startIdx, endIdx) {
for (; startIdx <= endIdx; startIdx++) {
    var idx = arr.indexOf(ownerArr[startIdx]);
    if (idx !== -1) {
        arr.splice(idx, 1);
    }
}
}

function patchArray(oldArr, newArr) {
// 模拟diff算法，result可看做oldArr映射的DOM
var result = oldArr.slice(),
    oldStartIdx = 0,
    newStartIdx = 0,
    oldEndIdx = oldArr.length - 1,
    oldStartItem = oldArr[0],
    oldEndItem = oldArr[oldEndIdx],
    newEndIdx = newArr.length - 1,
    newStartItem = newArr[0],
    newEndItem = newArr[newEndIdx],
    idxInOld, itemToMove;

while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartItem) {
        oldStartItem = oldArr[++oldStartIdx];
    }
    else if (!oldEndItem) {
        oldEndItem = oldArr[--oldEndIdx];
    }
    else if (oldStartItem === newStartItem) {
        console.log('Start item is equal: %s %s', oldStartItem, newStartItem);
        oldStartItem = oldArr[++oldStartIdx];
        newStartItem = newArr[++newStartIdx];
    }
    else if (oldEndItem === newEndItem) {
        console.log('End item is equal: %s %s', oldEndItem, newEndItem);
        oldEndItem = oldArr[--oldEndIdx];
        newEndItem = newArr[--newEndIdx];
    }
    else if (oldStartItem === newEndItem) {
        console.log('Old start item need insert before previous of oldEndItem');
        moveItem(result, oldEndItem, oldStartItem);
        oldStartItem = oldArr[++oldStartIdx];
        newEndItem = newArr[--newEndIdx];
    }
    else if (oldEndItem === newStartItem) {
        console.log('Old end item need insert before previous of oldStartItem');
        moveItem(result, oldStartItem, oldEndItem);
        oldEndItem = oldArr[--oldEndIdx];
        newStartItem = newArr[++newStartIdx];
    }
    else {
        idxInOld = oldArr.indexOf(newStartItem);
        // new item
        if (idxInOld === -1) {
            console.log('create new item insert before previous of oldStartItem');
            insertBefore(result, oldStartItem, newStartItem);
        }
        // item 在old中，需要移动
        else {
            itemToMove = oldArr[idxInOld];
            console.log('move itemToMove: %s to previous of oldStartItem', itemToMove);
            oldArr[idxInOld] = undefined;
            moveItem(result, oldStartItem, itemToMove);
        }
        newStartItem = newArr[++newStartIdx];
    }
}
if (oldStartIdx > oldEndIdx) { // oldArr已经遍历完了，newArr剩下的元素做新增处理
    console.log('将newArr中 newStartIdx: %s 至 newEndIdx: %s间的元素插入', newStartIdx, newEndIdx);
    addItems(result, newArr, newStartIdx, newEndIdx);
}
else if (newStartIdx > newEndIdx){ // newArr已经遍历完了，oldArr剩下的元素做删除处理
    console.log('oldArr中 %s 至 %s 的item需要移除', oldStartIdx, oldEndIdx);
    removeItems(result, oldArr, oldStartIdx, oldEndIdx);
}
return result;
}
var a1 = ['a', 'b', 'c', 'd', 'e'];
var a2 = ['a', 'c', 'e', 'f', 'g'];
console.log(patchArray(a1, a2));