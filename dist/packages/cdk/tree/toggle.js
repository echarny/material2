"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var tree_1 = require("./tree");
/**
 * Node toggle to expand/collapse the node.
 */
var CdkTreeNodeToggle = /** @class */ (function () {
    function CdkTreeNodeToggle(_tree, _treeNode) {
        this._tree = _tree;
        this._treeNode = _treeNode;
        this._recursive = false;
    }
    Object.defineProperty(CdkTreeNodeToggle.prototype, "recursive", {
        get: /** Whether expand/collapse the node recursively. */
        function () { return this._recursive; },
        set: function (value) { this._recursive = coercion_1.coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    CdkTreeNodeToggle.prototype._toggle = function (event) {
        this.recursive
            ? this._tree.treeControl.toggleDescendants(this._treeNode.data)
            : this._tree.treeControl.toggle(this._treeNode.data);
        event.stopPropagation();
    };
    CdkTreeNodeToggle.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkTreeNodeToggle]',
                    host: {
                        '(click)': '_toggle($event)',
                    }
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodeToggle.ctorParameters = function () { return [
        { type: tree_1.CdkTree, },
        { type: tree_1.CdkTreeNode, },
    ]; };
    CdkTreeNodeToggle.propDecorators = {
        "recursive": [{ type: core_1.Input, args: ['cdkTreeNodeToggleRecursive',] },],
    };
    return CdkTreeNodeToggle;
}());
exports.CdkTreeNodeToggle = CdkTreeNodeToggle;
//# sourceMappingURL=toggle.js.map