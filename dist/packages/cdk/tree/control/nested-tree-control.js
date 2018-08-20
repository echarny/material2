"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var base_tree_control_1 = require("./base-tree-control");
/** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
var /** Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type. */
NestedTreeControl = /** @class */ (function (_super) {
    __extends(NestedTreeControl, _super);
    /** Construct with nested tree function getChildren. */
    function NestedTreeControl(getChildren) {
        var _this = _super.call(this) || this;
        _this.getChildren = getChildren;
        return _this;
    }
    /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     */
    /**
       * Expands all dataNodes in the tree.
       *
       * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
       * data nodes of the tree.
       */
    NestedTreeControl.prototype.expandAll = /**
       * Expands all dataNodes in the tree.
       *
       * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
       * data nodes of the tree.
       */
    function () {
        var _this = this;
        this.expansionModel.clear();
        var allNodes = this.dataNodes.reduce(function (accumulator, dataNode) {
            return accumulator.concat(_this.getDescendants(dataNode), [dataNode]);
        }, []);
        (_a = this.expansionModel).select.apply(_a, allNodes);
        var _a;
    };
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    NestedTreeControl.prototype.getDescendants = /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    function (dataNode) {
        var descendants = [];
        this._getDescendants(descendants, dataNode);
        // Remove the node itself
        return descendants.splice(1);
    };
    /** A helper function to get descendants recursively. */
    /** A helper function to get descendants recursively. */
    NestedTreeControl.prototype._getDescendants = /** A helper function to get descendants recursively. */
    function (descendants, dataNode) {
        var _this = this;
        descendants.push(dataNode);
        var childrenNodes = this.getChildren(dataNode);
        if (Array.isArray(childrenNodes)) {
            childrenNodes.forEach(function (child) { return _this._getDescendants(descendants, child); });
        }
        else if (childrenNodes instanceof rxjs_1.Observable) {
            childrenNodes.pipe(operators_1.take(1)).subscribe(function (children) {
                children.forEach(function (child) { return _this._getDescendants(descendants, child); });
            });
        }
    };
    return NestedTreeControl;
}(base_tree_control_1.BaseTreeControl));
exports.NestedTreeControl = NestedTreeControl;
//# sourceMappingURL=nested-tree-control.js.map