"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** Wraps the provided value in an array, unless the provided value is an array. */
function coerceArray(value) {
    return Array.isArray(value) ? value : [value];
}
exports.coerceArray = coerceArray;
//# sourceMappingURL=array.js.map