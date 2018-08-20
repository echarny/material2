"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var bidi_1 = require("@angular/cdk/bidi");
var coercion_1 = require("@angular/cdk/coercion");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var tree_1 = require("./tree");
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
var CdkTreeNodePadding = /** @class */ (function () {
    function CdkTreeNodePadding(_treeNode, _tree, _renderer, _element, _dir) {
        var _this = this;
        this._treeNode = _treeNode;
        this._tree = _tree;
        this._renderer = _renderer;
        this._element = _element;
        this._dir = _dir;
        /** Subject that emits when the component has been destroyed. */
        this._destroyed = new rxjs_1.Subject();
        this._indent = 40;
        this._setPadding();
        if (this._dir) {
            this._dir.change.pipe(operators_1.takeUntil(this._destroyed)).subscribe(function () { return _this._setPadding(); });
        }
    }
    Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
        get: /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
        function () { return this._level; },
        set: function (value) {
            this._level = coercion_1.coerceNumberProperty(value);
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
        get: /** The indent for each level. Default number 40px from material design menu sub-menu spec. */
        // TODO(tinayuangao): Make indent working with a string with unit, e.g. 10em
        function () { return this._indent; },
        set: function (value) {
            this._indent = coercion_1.coerceNumberProperty(value);
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    CdkTreeNodePadding.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    CdkTreeNodePadding.prototype._paddingIndent = /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    function () {
        var nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        var level = this._level || nodeLevel;
        return level ? level * this._indent + "px" : null;
    };
    CdkTreeNodePadding.prototype._setPadding = function () {
        var padding = this._paddingIndent();
        var paddingProp = this._dir && this._dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this._renderer.setStyle(this._element.nativeElement, paddingProp, padding);
    };
    CdkTreeNodePadding.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cdkTreeNodePadding]',
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodePadding.ctorParameters = function () { return [
        { type: tree_1.CdkTreeNode, },
        { type: tree_1.CdkTree, },
        { type: core_1.Renderer2, },
        { type: core_1.ElementRef, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    CdkTreeNodePadding.propDecorators = {
        "level": [{ type: core_1.Input, args: ['cdkTreeNodePadding',] },],
        "indent": [{ type: core_1.Input, args: ['cdkTreeNodePaddingIndent',] },],
    };
    return CdkTreeNodePadding;
}());
exports.CdkTreeNodePadding = CdkTreeNodePadding;
//# sourceMappingURL=padding.js.map