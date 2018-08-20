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
import * as tslib_1 from "tslib";
import { CdkNestedTreeNode, CdkTree, CdkTreeNode, CdkTreeNodeDef, } from '@angular/cdk/tree';
import { Attribute, ContentChildren, Directive, ElementRef, Input, IterableDiffers, QueryList, TemplateRef, } from '@angular/core';
import { mixinDisabled, mixinTabIndex } from '@angular/material/core';
import { MatTreeNodeOutlet } from './outlet';
export var /** @type {?} */ _MatTreeNodeMixinBase = mixinTabIndex(mixinDisabled(CdkTreeNode));
export var /** @type {?} */ _MatNestedTreeNodeMixinBase = mixinTabIndex(mixinDisabled(CdkNestedTreeNode));
/**
 * Wrapper for the CdkTree node with Material design styles.
 * @template T
 */
var MatTreeNode = /** @class */ (function (_super) {
    tslib_1.__extends(MatTreeNode, _super);
    function MatTreeNode(_elementRef, _tree, tabIndex) {
        var _this = _super.call(this, _elementRef, _tree) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this.role = 'treeitem';
        _this.tabIndex = Number(tabIndex) || 0;
        return _this;
    }
    MatTreeNode.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-tree-node',
                    exportAs: 'matTreeNode',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.aria-level]': 'role === "treeitem" ? level : null',
                        '[attr.role]': 'role',
                        'class': 'mat-tree-node'
                    },
                    providers: [{ provide: CdkTreeNode, useExisting: MatTreeNode }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNode.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: CdkTree, },
        { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
    ]; };
    MatTreeNode.propDecorators = {
        "role": [{ type: Input },],
    };
    return MatTreeNode;
}(_MatTreeNodeMixinBase));
export { MatTreeNode };
function MatTreeNode_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTreeNode.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTreeNode.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatTreeNode.propDecorators;
    /** @type {?} */
    MatTreeNode.prototype.role;
    /** @type {?} */
    MatTreeNode.prototype._elementRef;
    /** @type {?} */
    MatTreeNode.prototype._tree;
}
/**
 * Wrapper for the CdkTree node definition with Material design styles.
 * @template T
 */
var MatTreeNodeDef = /** @class */ (function (_super) {
    tslib_1.__extends(MatTreeNodeDef, _super);
    // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
    // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
    // fixed bug.
    // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
    // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
    function MatTreeNodeDef(template) {
        return _super.call(this, template) || this;
    }
    MatTreeNodeDef.decorators = [
        { type: Directive, args: [{
                    selector: '[matTreeNodeDef]',
                    inputs: [
                        'when: matTreeNodeDefWhen'
                    ],
                    providers: [{ provide: CdkTreeNodeDef, useExisting: MatTreeNodeDef }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNodeDef.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    MatTreeNodeDef.propDecorators = {
        "data": [{ type: Input, args: ['matTreeNode',] },],
    };
    return MatTreeNodeDef;
}(CdkTreeNodeDef));
export { MatTreeNodeDef };
function MatTreeNodeDef_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTreeNodeDef.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTreeNodeDef.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatTreeNodeDef.propDecorators;
    /** @type {?} */
    MatTreeNodeDef.prototype.data;
}
/**
 * Wrapper for the CdkTree nested node with Material design styles.
 * @template T
 */
var MatNestedTreeNode = /** @class */ (function (_super) {
    tslib_1.__extends(MatNestedTreeNode, _super);
    function MatNestedTreeNode(_elementRef, _tree, _differs, tabIndex) {
        var _this = _super.call(this, _elementRef, _tree, _differs) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this._differs = _differs;
        _this.tabIndex = Number(tabIndex) || 0;
        return _this;
    }
    // This is a workaround for https://github.com/angular/angular/issues/23091
    // In aot mode, the lifecycle hooks from parent class are not called.
    // TODO(tinayuangao): Remove when the angular issue #23091 is fixed
    /**
     * @return {?}
     */
    MatNestedTreeNode.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngAfterContentInit.call(this);
    };
    /**
     * @return {?}
     */
    MatNestedTreeNode.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    MatNestedTreeNode.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-nested-tree-node',
                    exportAs: 'matNestedTreeNode',
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.role]': 'role',
                        'class': 'mat-nested-tree-node',
                    },
                    inputs: ['disabled', 'tabIndex'],
                    providers: [
                        { provide: CdkNestedTreeNode, useExisting: MatNestedTreeNode },
                        { provide: CdkTreeNode, useExisting: MatNestedTreeNode }
                    ]
                },] },
    ];
    /** @nocollapse */
    MatNestedTreeNode.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: CdkTree, },
        { type: IterableDiffers, },
        { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
    ]; };
    MatNestedTreeNode.propDecorators = {
        "node": [{ type: Input, args: ['matNestedTreeNode',] },],
        "nodeOutlet": [{ type: ContentChildren, args: [MatTreeNodeOutlet,] },],
    };
    return MatNestedTreeNode;
}(_MatNestedTreeNodeMixinBase));
export { MatNestedTreeNode };
function MatNestedTreeNode_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatNestedTreeNode.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatNestedTreeNode.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatNestedTreeNode.propDecorators;
    /** @type {?} */
    MatNestedTreeNode.prototype.node;
    /** @type {?} */
    MatNestedTreeNode.prototype.nodeOutlet;
    /** @type {?} */
    MatNestedTreeNode.prototype._elementRef;
    /** @type {?} */
    MatNestedTreeNode.prototype._tree;
    /** @type {?} */
    MatNestedTreeNode.prototype._differs;
}
//# sourceMappingURL=node.js.map