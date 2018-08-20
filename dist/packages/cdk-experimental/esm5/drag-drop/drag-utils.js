/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Moves an item one index in an array to another.
 * @template T
 * @param {?} array Array in which to move the item.
 * @param {?} fromIndex Starting index of the item.
 * @param {?} toIndex Index to which the item should be moved.
 * @return {?}
 */
export function moveItemInArray(array, fromIndex, toIndex) {
    var /** @type {?} */ from = clamp(fromIndex, array.length - 1);
    var /** @type {?} */ to = clamp(toIndex, array.length - 1);
    if (from === to) {
        return;
    }
    var /** @type {?} */ target = array[from];
    var /** @type {?} */ delta = to < from ? -1 : 1;
    for (var /** @type {?} */ i = from; i !== to; i += delta) {
        array[i] = array[i + delta];
    }
    array[to] = target;
}
/**
 * Moves an item from one array to another.
 * @template T
 * @param {?} currentArray Array from which to transfer the item.
 * @param {?} targetArray Array into which to put the item.
 * @param {?} currentIndex Index of the item in its current array.
 * @param {?} targetIndex Index at which to insert the item.
 * @return {?}
 */
export function transferArrayItem(currentArray, targetArray, currentIndex, targetIndex) {
    var /** @type {?} */ from = clamp(currentIndex, currentArray.length - 1);
    var /** @type {?} */ to = clamp(targetIndex, targetArray.length);
    if (currentArray.length) {
        targetArray.splice(to, 0, currentArray.splice(from, 1)[0]);
    }
}
/**
 * Clamps a number between zero and a maximum.
 * @param {?} value
 * @param {?} max
 * @return {?}
 */
function clamp(value, max) {
    return Math.max(0, Math.min(max, value));
}
//# sourceMappingURL=drag-utils.js.map