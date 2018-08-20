/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ContentChildren, Directive, ElementRef, IterableDiffers, QueryList, } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkTree, CdkTreeNode } from './tree';
import { CdkTreeNodeOutlet } from './outlet';
import { getTreeControlFunctionsMissingError } from './tree-errors';
/**
 * Nested node is a child of `<cdk-tree>`. It works with nested tree.
 * By using `cdk-nested-tree-node` component in tree node template, children of the parent node will
 * be added in the `cdkTreeNodeOutlet` in tree node template.
 * For example:
 *   ```html
 *   <cdk-mested-tree-node>
 *     {{node.name}}
 *     <ng-template cdkTreeNodeOutlet></ng-template>
 *   </cdk-tree-node>
 *   ```
 * The children of node will be automatically added to `cdkTreeNodeOutlet`, the result dom will be
 * like this:
 *   ```html
 *   <cdk-nested-tree-node>
 *     {{node.name}}
 *      <cdk-nested-tree-node>{{child1.name}}</cdk-tree-node>
 *      <cdk-nested-tree-node>{{child2.name}}</cdk-tree-node>
 *   </cdk-tree-node>
 *   ```
 * @template T
 */
var CdkNestedTreeNode = /** @class */ (function (_super) {
    tslib_1.__extends(CdkNestedTreeNode, _super);
    function CdkNestedTreeNode(_elementRef, _tree, _differs) {
        var _this = _super.call(this, _elementRef, _tree) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this._differs = _differs;
        return _this;
    }
    /**
     * @return {?}
     */
    CdkNestedTreeNode.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._dataDiffer = this._differs.find([]).create(this._tree.trackBy);
        if (!this._tree.treeControl.getChildren) {
            throw getTreeControlFunctionsMissingError();
        }
        var /** @type {?} */ childrenNodes = this._tree.treeControl.getChildren(this.data);
        if (Array.isArray(childrenNodes)) {
            this.updateChildrenNodes(/** @type {?} */ (childrenNodes));
        }
        else if (childrenNodes instanceof Observable) {
            childrenNodes.pipe(takeUntil(this._destroyed))
                .subscribe(function (result) { return _this.updateChildrenNodes(result); });
        }
        this.nodeOutlet.changes.pipe(takeUntil(this._destroyed))
            .subscribe(function () { return _this.updateChildrenNodes(); });
    };
    /**
     * @return {?}
     */
    CdkNestedTreeNode.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._clear();
        _super.prototype.ngOnDestroy.call(this);
    };
    /** Add children dataNodes to the NodeOutlet */
    /**
     * Add children dataNodes to the NodeOutlet
     * @param {?=} children
     * @return {?}
     */
    CdkNestedTreeNode.prototype.updateChildrenNodes = /**
     * Add children dataNodes to the NodeOutlet
     * @param {?=} children
     * @return {?}
     */
    function (children) {
        if (children) {
            this._children = children;
        }
        if (this.nodeOutlet.length && this._children) {
            var /** @type {?} */ viewContainer = this.nodeOutlet.first.viewContainer;
            this._tree.renderNodeChanges(this._children, this._dataDiffer, viewContainer, this._data);
        }
        else {
            // Reset the data differ if there's no children nodes displayed
            this._dataDiffer.diff([]);
        }
    };
    /** Clear the children dataNodes. */
    /**
     * Clear the children dataNodes.
     * @return {?}
     */
    CdkNestedTreeNode.prototype._clear = /**
     * Clear the children dataNodes.
     * @return {?}
     */
    function () {
        if (this.nodeOutlet && this.nodeOutlet.first) {
            this.nodeOutlet.first.viewContainer.clear();
            this._dataDiffer.diff([]);
        }
    };
    CdkNestedTreeNode.decorators = [
        { type: Directive, args: [{
                    selector: 'cdk-nested-tree-node',
                    exportAs: 'cdkNestedTreeNode',
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.role]': 'role',
                        'class': 'cdk-tree-node cdk-nested-tree-node',
                    },
                    providers: [{ provide: CdkTreeNode, useExisting: CdkNestedTreeNode }]
                },] },
    ];
    /** @nocollapse */
    CdkNestedTreeNode.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: CdkTree, },
        { type: IterableDiffers, },
    ]; };
    CdkNestedTreeNode.propDecorators = {
        "nodeOutlet": [{ type: ContentChildren, args: [CdkTreeNodeOutlet,] },],
    };
    return CdkNestedTreeNode;
}(CdkTreeNode));
export { CdkNestedTreeNode };
function CdkNestedTreeNode_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkNestedTreeNode.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkNestedTreeNode.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkNestedTreeNode.propDecorators;
    /**
     * Differ used to find the changes in the data provided by the data source.
     * @type {?}
     */
    CdkNestedTreeNode.prototype._dataDiffer;
    /**
     * The children data dataNodes of current node. They will be placed in `CdkTreeNodeOutlet`.
     * @type {?}
     */
    CdkNestedTreeNode.prototype._children;
    /**
     * The children node placeholder.
     * @type {?}
     */
    CdkNestedTreeNode.prototype.nodeOutlet;
    /** @type {?} */
    CdkNestedTreeNode.prototype._elementRef;
    /** @type {?} */
    CdkNestedTreeNode.prototype._tree;
    /** @type {?} */
    CdkNestedTreeNode.prototype._differs;
}
//# sourceMappingURL=nested-node.js.map