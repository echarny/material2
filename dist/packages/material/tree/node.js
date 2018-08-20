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
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tree_1 = require("@angular/cdk/tree");
var core_1 = require("@angular/core");
var core_2 = require("@angular/material/core");
var outlet_1 = require("./outlet");
exports._MatTreeNodeMixinBase = core_2.mixinTabIndex(core_2.mixinDisabled(tree_1.CdkTreeNode));
exports._MatNestedTreeNodeMixinBase = core_2.mixinTabIndex(core_2.mixinDisabled(tree_1.CdkNestedTreeNode));
/**
 * Wrapper for the CdkTree node with Material design styles.
 */
var MatTreeNode = /** @class */ (function (_super) {
    __extends(MatTreeNode, _super);
    function MatTreeNode(_elementRef, _tree, tabIndex) {
        var _this = _super.call(this, _elementRef, _tree) || this;
        _this._elementRef = _elementRef;
        _this._tree = _tree;
        _this.role = 'treeitem';
        _this.tabIndex = Number(tabIndex) || 0;
        return _this;
    }
    MatTreeNode.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-tree-node',
                    exportAs: 'matTreeNode',
                    inputs: ['disabled', 'tabIndex'],
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.aria-level]': 'role === "treeitem" ? level : null',
                        '[attr.role]': 'role',
                        'class': 'mat-tree-node'
                    },
                    providers: [{ provide: tree_1.CdkTreeNode, useExisting: MatTreeNode }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNode.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: tree_1.CdkTree, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['tabindex',] },] },
    ]; };
    MatTreeNode.propDecorators = {
        "role": [{ type: core_1.Input },],
    };
    return MatTreeNode;
}(exports._MatTreeNodeMixinBase));
exports.MatTreeNode = MatTreeNode;
/**
 * Wrapper for the CdkTree node definition with Material design styles.
 */
var MatTreeNodeDef = /** @class */ (function (_super) {
    __extends(MatTreeNodeDef, _super);
    // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
    // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
    // fixed bug.
    // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
    // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
    function MatTreeNodeDef(template) {
        return _super.call(this, template) || this;
    }
    MatTreeNodeDef.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matTreeNodeDef]',
                    inputs: [
                        'when: matTreeNodeDefWhen'
                    ],
                    providers: [{ provide: tree_1.CdkTreeNodeDef, useExisting: MatTreeNodeDef }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNodeDef.ctorParameters = function () { return [
        { type: core_1.TemplateRef, },
    ]; };
    MatTreeNodeDef.propDecorators = {
        "data": [{ type: core_1.Input, args: ['matTreeNode',] },],
    };
    return MatTreeNodeDef;
}(tree_1.CdkTreeNodeDef));
exports.MatTreeNodeDef = MatTreeNodeDef;
/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
var MatNestedTreeNode = /** @class */ (function (_super) {
    __extends(MatNestedTreeNode, _super);
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
    // This is a workaround for https://github.com/angular/angular/issues/23091
    // In aot mode, the lifecycle hooks from parent class are not called.
    // TODO(tinayuangao): Remove when the angular issue #23091 is fixed
    MatNestedTreeNode.prototype.ngAfterContentInit = 
    // This is a workaround for https://github.com/angular/angular/issues/23091
    // In aot mode, the lifecycle hooks from parent class are not called.
    // TODO(tinayuangao): Remove when the angular issue #23091 is fixed
    function () {
        _super.prototype.ngAfterContentInit.call(this);
    };
    MatNestedTreeNode.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    MatNestedTreeNode.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'mat-nested-tree-node',
                    exportAs: 'matNestedTreeNode',
                    host: {
                        '[attr.aria-expanded]': 'isExpanded',
                        '[attr.role]': 'role',
                        'class': 'mat-nested-tree-node',
                    },
                    inputs: ['disabled', 'tabIndex'],
                    providers: [
                        { provide: tree_1.CdkNestedTreeNode, useExisting: MatNestedTreeNode },
                        { provide: tree_1.CdkTreeNode, useExisting: MatNestedTreeNode }
                    ]
                },] },
    ];
    /** @nocollapse */
    MatNestedTreeNode.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: tree_1.CdkTree, },
        { type: core_1.IterableDiffers, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['tabindex',] },] },
    ]; };
    MatNestedTreeNode.propDecorators = {
        "node": [{ type: core_1.Input, args: ['matNestedTreeNode',] },],
        "nodeOutlet": [{ type: core_1.ContentChildren, args: [outlet_1.MatTreeNodeOutlet,] },],
    };
    return MatNestedTreeNode;
}(exports._MatNestedTreeNodeMixinBase));
exports.MatNestedTreeNode = MatNestedTreeNode;
//# sourceMappingURL=node.js.map