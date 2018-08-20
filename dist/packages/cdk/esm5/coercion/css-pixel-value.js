/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Coerces a value to a CSS pixel value.
 * @param {?} value
 * @return {?}
 */
export function coerceCssPixelValue(value) {
    if (value == null) {
        return '';
    }
    return typeof value === 'string' ? value : value + "px";
}
//# sourceMappingURL=css-pixel-value.js.map