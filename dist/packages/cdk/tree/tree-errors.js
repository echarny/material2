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
 * Returns an error to be thrown when there is no usable data.
 * @docs-private
 */
function getTreeNoValidDataSourceError() {
    return Error("A valid data source must be provided.");
}
exports.getTreeNoValidDataSourceError = getTreeNoValidDataSourceError;
/**
 * Returns an error to be thrown when there are multiple nodes that are missing a when function.
 * @docs-private
 */
function getTreeMultipleDefaultNodeDefsError() {
    return Error("There can only be one default row without a when predicate function.");
}
exports.getTreeMultipleDefaultNodeDefsError = getTreeMultipleDefaultNodeDefsError;
/**
 * Returns an error to be thrown when there are no matching node defs for a particular set of data.
 * @docs-private
 */
function getTreeMissingMatchingNodeDefError() {
    return Error("Could not find a matching node definition for the provided node data.");
}
exports.getTreeMissingMatchingNodeDefError = getTreeMissingMatchingNodeDefError;
/**
 * Returns an error to be thrown when there are tree control.
 * @docs-private
 */
function getTreeControlMissingError() {
    return Error("Could not find a tree control for the tree.");
}
exports.getTreeControlMissingError = getTreeControlMissingError;
/**
 * Returns an error to be thrown when tree control did not implement functions for flat/nested node.
 * @docs-private
 */
function getTreeControlFunctionsMissingError() {
    return Error("Could not find functions for nested/flat tree in tree control.");
}
exports.getTreeControlFunctionsMissingError = getTreeControlFunctionsMissingError;
//# sourceMappingURL=tree-errors.js.map