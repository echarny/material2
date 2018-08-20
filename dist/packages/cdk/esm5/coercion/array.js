/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Wraps the provided value in an array, unless the provided value is an array.
 * @template T
 * @param {?} value
 * @return {?}
 */
export function coerceArray(value) {
    return Array.isArray(value) ? value : [value];
}
//# sourceMappingURL=array.js.map