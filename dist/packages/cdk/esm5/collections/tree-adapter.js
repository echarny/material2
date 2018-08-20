/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Interface for a class that can flatten hierarchical structured data and re-expand the flattened
 * data back into its original structure. Should be used in conjunction with the cdk-tree.
 * @record
 * @template T
 */
export function TreeDataNodeFlattener() { }
function TreeDataNodeFlattener_tsickle_Closure_declarations() {
    /**
     * Transforms a set of hierarchical structured data into a flattened data array.
     * @type {?}
     */
    TreeDataNodeFlattener.prototype.flattenNodes;
    /**
     * Expands a flattened array of data into its hierarchical form using the provided expansion
     * model.
     * @type {?}
     */
    TreeDataNodeFlattener.prototype.expandFlattenedNodes;
    /**
     * Put node descendants of node in array.
     * If `onlyExpandable` is true, then only process expandable descendants.
     * @type {?}
     */
    TreeDataNodeFlattener.prototype.nodeDescendents;
}
//# sourceMappingURL=tree-adapter.js.map