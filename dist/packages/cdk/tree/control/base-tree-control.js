"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
/** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
var /** Base tree control. It has basic toggle/expand/collapse operations on a single data node. */
BaseTreeControl = /** @class */ (function () {
    function BaseTreeControl() {
        /** A selection model with multi-selection to track expansion status. */
        this.expansionModel = new collections_1.SelectionModel(true);
    }
    /** Toggles one single data node's expanded/collapsed state. */
    /** Toggles one single data node's expanded/collapsed state. */
    BaseTreeControl.prototype.toggle = /** Toggles one single data node's expanded/collapsed state. */
    function (dataNode) {
        this.expansionModel.toggle(dataNode);
    };
    /** Expands one single data node. */
    /** Expands one single data node. */
    BaseTreeControl.prototype.expand = /** Expands one single data node. */
    function (dataNode) {
        this.expansionModel.select(dataNode);
    };
    /** Collapses one single data node. */
    /** Collapses one single data node. */
    BaseTreeControl.prototype.collapse = /** Collapses one single data node. */
    function (dataNode) {
        this.expansionModel.deselect(dataNode);
    };
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    BaseTreeControl.prototype.isExpanded = /** Whether a given data node is expanded or not. Returns true if the data node is expanded. */
    function (dataNode) {
        return this.expansionModel.isSelected(dataNode);
    };
    /** Toggles a subtree rooted at `node` recursively. */
    /** Toggles a subtree rooted at `node` recursively. */
    BaseTreeControl.prototype.toggleDescendants = /** Toggles a subtree rooted at `node` recursively. */
    function (dataNode) {
        this.expansionModel.isSelected(dataNode)
            ? this.collapseDescendants(dataNode)
            : this.expandDescendants(dataNode);
    };
    /** Collapse all dataNodes in the tree. */
    /** Collapse all dataNodes in the tree. */
    BaseTreeControl.prototype.collapseAll = /** Collapse all dataNodes in the tree. */
    function () {
        this.expansionModel.clear();
    };
    /** Expands a subtree rooted at given data node recursively. */
    /** Expands a subtree rooted at given data node recursively. */
    BaseTreeControl.prototype.expandDescendants = /** Expands a subtree rooted at given data node recursively. */
    function (dataNode) {
        var toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).select.apply(_a, toBeProcessed);
        var _a;
    };
    /** Collapses a subtree rooted at given data node recursively. */
    /** Collapses a subtree rooted at given data node recursively. */
    BaseTreeControl.prototype.collapseDescendants = /** Collapses a subtree rooted at given data node recursively. */
    function (dataNode) {
        var toBeProcessed = [dataNode];
        toBeProcessed.push.apply(toBeProcessed, this.getDescendants(dataNode));
        (_a = this.expansionModel).deselect.apply(_a, toBeProcessed);
        var _a;
    };
    return BaseTreeControl;
}());
exports.BaseTreeControl = BaseTreeControl;
//# sourceMappingURL=base-tree-control.js.map