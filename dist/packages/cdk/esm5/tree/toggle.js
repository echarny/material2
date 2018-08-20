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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, } from '@angular/core';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Node toggle to expand/collapse the node.
 * @template T
 */
var CdkTreeNodeToggle = /** @class */ (function () {
    function CdkTreeNodeToggle(_tree, _treeNode) {
        this._tree = _tree;
        this._treeNode = _treeNode;
        this._recursive = false;
    }
    Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
        get: /**
         * Whether expand/collapse the node recursively.
         * @return {?}
         */
        function () { return this._recursive; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._recursive = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    CdkTreeNodeToggle.prototype._toggle = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.recursive
            ? this._tree.treeControl.toggleDescendants(this._treeNode.data)
            : this._tree.treeControl.toggle(this._treeNode.data);
        event.stopPropagation();
    };
    CdkTreeNodeToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodeToggle]',
                    host: {
                        '(click)': '_toggle($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeToggle.ctorParameters = function () { return [
        { type: CdkTree, },
        { type: CdkTreeNode, },
    ]; };
    CdkTreeNodeToggle.propDecorators = {
        "recursive": [{ type: Input, args: ['cdkTreeNodeToggleRecursive',] },],
    };
    return CdkTreeNodeToggle;
}());
export { CdkTreeNodeToggle };
function CdkTreeNodeToggle_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkTreeNodeToggle.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkTreeNodeToggle.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkTreeNodeToggle.propDecorators;
    /** @type {?} */
    CdkTreeNodeToggle.prototype._recursive;
    /** @type {?} */
    CdkTreeNodeToggle.prototype._tree;
    /** @type {?} */
    CdkTreeNodeToggle.prototype._treeNode;
}
//# sourceMappingURL=toggle.js.map