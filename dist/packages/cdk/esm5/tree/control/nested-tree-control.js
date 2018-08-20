/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BaseTreeControl } from './base-tree-control';
/**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
var /**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
NestedTreeControl = /** @class */ (function (_super) {
    tslib_1.__extends(NestedTreeControl, _super);
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
     * @return {?}
     */
    NestedTreeControl.prototype.expandAll = /**
     * Expands all dataNodes in the tree.
     *
     * To make this working, the `dataNodes` variable of the TreeControl must be set to all root level
     * data nodes of the tree.
     * @return {?}
     */
    function () {
        var _this = this;
        this.expansionModel.clear();
        var /** @type {?} */ allNodes = this.dataNodes.reduce(function (accumulator, dataNode) {
            return accumulator.concat(_this.getDescendants(dataNode), [dataNode]);
        }, []);
        (_a = this.expansionModel).select.apply(_a, allNodes);
        var _a;
    };
    /** Gets a list of descendant dataNodes of a subtree rooted at given data node recursively. */
    /**
     * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    NestedTreeControl.prototype.getDescendants = /**
     * Gets a list of descendant dataNodes of a subtree rooted at given data node recursively.
     * @param {?} dataNode
     * @return {?}
     */
    function (dataNode) {
        var /** @type {?} */ descendants = [];
        this._getDescendants(descendants, dataNode);
        // Remove the node itself
        return descendants.splice(1);
    };
    /** A helper function to get descendants recursively. */
    /**
     * A helper function to get descendants recursively.
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    NestedTreeControl.prototype._getDescendants = /**
     * A helper function to get descendants recursively.
     * @param {?} descendants
     * @param {?} dataNode
     * @return {?}
     */
    function (descendants, dataNode) {
        var _this = this;
        descendants.push(dataNode);
        var /** @type {?} */ childrenNodes = this.getChildren(dataNode);
        if (Array.isArray(childrenNodes)) {
            childrenNodes.forEach(function (child) { return _this._getDescendants(descendants, child); });
        }
        else if (childrenNodes instanceof Observable) {
            childrenNodes.pipe(take(1)).subscribe(function (children) {
                children.forEach(function (child) { return _this._getDescendants(descendants, child); });
            });
        }
    };
    return NestedTreeControl;
}(BaseTreeControl));
/**
 * Nested tree control. Able to expand/collapse a subtree recursively for NestedNode type.
 * @template T
 */
export { NestedTreeControl };
function NestedTreeControl_tsickle_Closure_declarations() {
    /** @type {?} */
    NestedTreeControl.prototype.getChildren;
}
//# sourceMappingURL=nested-tree-control.js.map