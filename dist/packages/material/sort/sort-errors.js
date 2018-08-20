"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** @docs-private */
function getSortDuplicateSortableIdError(id) {
    return Error("Cannot have two MatSortables with the same id (" + id + ").");
}
exports.getSortDuplicateSortableIdError = getSortDuplicateSortableIdError;
/** @docs-private */
function getSortHeaderNotContainedWithinSortError() {
    return Error("MatSortHeader must be placed within a parent element with the MatSort directive.");
}
exports.getSortHeaderNotContainedWithinSortError = getSortHeaderNotContainedWithinSortError;
/** @docs-private */
function getSortHeaderMissingIdError() {
    return Error("MatSortHeader must be provided with a unique id.");
}
exports.getSortHeaderMissingIdError = getSortHeaderMissingIdError;
/** @docs-private */
function getSortInvalidDirectionError(direction) {
    return Error(direction + " is not a valid sort direction ('asc' or 'desc').");
}
exports.getSortInvalidDirectionError = getSortInvalidDirectionError;
//# sourceMappingURL=sort-errors.js.map