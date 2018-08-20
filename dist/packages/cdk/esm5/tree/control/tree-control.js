/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Tree control interface. User can implement TreeControl to expand/collapse dataNodes in the tree.
 * The CDKTree will use this TreeControl to expand/collapse a node.
 * User can also use it outside the `<cdk-tree>` to control the expansion status of the tree.
 * @record
 * @template T
 */
export function TreeControl() { }
function TreeControl_tsickle_Closure_declarations() {
    /**
     * The saved tree nodes data for `expandAll` action.
     * @type {?}
     */
    TreeControl.prototype.dataNodes;
    /**
     * The expansion model
     * @type {?}
     */
    TreeControl.prototype.expansionModel;
    /**
     * Whether the data node is expanded or collapsed. Return true if it's expanded.
     * @type {?}
     */
    TreeControl.prototype.isExpanded;
    /**
     * Get all descendants of a data node
     * @type {?}
     */
    TreeControl.prototype.getDescendants;
    /**
     * Expand or collapse data node
     * @type {?}
     */
    TreeControl.prototype.toggle;
    /**
     * Expand one data node
     * @type {?}
     */
    TreeControl.prototype.expand;
    /**
     * Collapse one data node
     * @type {?}
     */
    TreeControl.prototype.collapse;
    /**
     * Expand all the dataNodes in the tree
     * @type {?}
     */
    TreeControl.prototype.expandAll;
    /**
     * Collapse all the dataNodes in the tree
     * @type {?}
     */
    TreeControl.prototype.collapseAll;
    /**
     * Toggle a data node by expand/collapse it and all its descendants
     * @type {?}
     */
    TreeControl.prototype.toggleDescendants;
    /**
     * Expand a data node and all its descendants
     * @type {?}
     */
    TreeControl.prototype.expandDescendants;
    /**
     * Collapse a data node and all its descendants
     * @type {?}
     */
    TreeControl.prototype.collapseDescendants;
    /**
     * Get depth of a given data node, return the level number. This is for flat tree node.
     * @type {?}
     */
    TreeControl.prototype.getLevel;
    /**
     * Whether the data node is expandable. Returns true if expandable.
     * This is for flat tree node.
     * @type {?}
     */
    TreeControl.prototype.isExpandable;
    /**
     * Gets a stream that emits whenever the given data node's children change.
     * @type {?}
     */
    TreeControl.prototype.getChildren;
}
//# sourceMappingURL=tree-control.js.map