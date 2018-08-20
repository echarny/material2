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
 * Converts values into strings. Falsy values become empty strings.
 * @docs-private
 */
function coerceToString(value) {
    return "" + (value || '');
}
exports.coerceToString = coerceToString;
/**
 * Converts a value that might be a string into a number.
 * @docs-private
 */
function coerceToNumber(value) {
    return typeof value === 'string' ? parseInt(value, 10) : value;
}
exports.coerceToNumber = coerceToNumber;
//# sourceMappingURL=grid-list-measure.js.map