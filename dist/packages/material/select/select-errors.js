"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns an exception to be thrown when attempting to change a select's `multiple` option
 * after initialization.
 * @docs-private
 */
function getMatSelectDynamicMultipleError() {
    return Error('Cannot change `multiple` mode of select after initialization.');
}
exports.getMatSelectDynamicMultipleError = getMatSelectDynamicMultipleError;
/**
 * Returns an exception to be thrown when attempting to assign a non-array value to a select
 * in `multiple` mode. Note that `undefined` and `null` are still valid values to allow for
 * resetting the value.
 * @docs-private
 */
function getMatSelectNonArrayValueError() {
    return Error('Value must be an array in multiple-selection mode.');
}
exports.getMatSelectNonArrayValueError = getMatSelectNonArrayValueError;
/**
 * Returns an exception to be thrown when assigning a non-function value to the comparator
 * used to determine if a value corresponds to an option. Note that whether the function
 * actually takes two values and returns a boolean is not checked.
 */
function getMatSelectNonFunctionValueError() {
    return Error('`compareWith` must be a function.');
}
exports.getMatSelectNonFunctionValueError = getMatSelectNonFunctionValueError;
//# sourceMappingURL=select-errors.js.map