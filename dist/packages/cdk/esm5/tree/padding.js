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
import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkTree, CdkTreeNode } from './tree';
/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 * @template T
 */
var CdkTreeNodePadding = /** @class */ (function () {
    function CdkTreeNodePadding(_treeNode, _tree, _renderer, _element, _dir) {
        var _this = this;
        this._treeNode = _treeNode;
        this._tree = _tree;
        this._renderer = _renderer;
        this._element = _element;
        this._dir = _dir;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._destroyed = new Subject();
        this._indent = 40;
        this._setPadding();
        if (this._dir) {
            this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(function () { return _this._setPadding(); });
        }
    }
    Object.defineProperty(CdkTreeNodePadding.prototype, "level", {
        get: /**
         * The level of depth of the tree node. The padding will be `level * indent` pixels.
         * @return {?}
         */
        function () { return this._level; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._level = coerceNumberProperty(value);
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkTreeNodePadding.prototype, "indent", {
        get: /**
         * The indent for each level. Default number 40px from material design menu sub-menu spec.
         * @return {?}
         */
        function () { return this._indent; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._indent = coerceNumberProperty(value);
            this._setPadding();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkTreeNodePadding.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @return {?}
     */
    CdkTreeNodePadding.prototype._paddingIndent = /**
     * The padding indent value for the tree node. Returns a string with px numbers if not null.
     * @return {?}
     */
    function () {
        var /** @type {?} */ nodeLevel = (this._treeNode.data && this._tree.treeControl.getLevel)
            ? this._tree.treeControl.getLevel(this._treeNode.data)
            : null;
        var /** @type {?} */ level = this._level || nodeLevel;
        return level ? level * this._indent + "px" : null;
    };
    /**
     * @return {?}
     */
    CdkTreeNodePadding.prototype._setPadding = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ padding = this._paddingIndent();
        var /** @type {?} */ paddingProp = this._dir && this._dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
        this._renderer.setStyle(this._element.nativeElement, paddingProp, padding);
    };
    CdkTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkTreeNodePadding]',
                },] },
    ];
    /** @nocollapse */
    CdkTreeNodePadding.ctorParameters = function () { return [
        { type: CdkTreeNode, },
        { type: CdkTree, },
        { type: Renderer2, },
        { type: ElementRef, },
        { type: Directionality, decorators: [{ type: Optional },] },
    ]; };
    CdkTreeNodePadding.propDecorators = {
        "level": [{ type: Input, args: ['cdkTreeNodePadding',] },],
        "indent": [{ type: Input, args: ['cdkTreeNodePaddingIndent',] },],
    };
    return CdkTreeNodePadding;
}());
export { CdkTreeNodePadding };
function CdkTreeNodePadding_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CdkTreeNodePadding.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CdkTreeNodePadding.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CdkTreeNodePadding.propDecorators;
    /**
     * Subject that emits when the component has been destroyed.
     * @type {?}
     */
    CdkTreeNodePadding.prototype._destroyed;
    /** @type {?} */
    CdkTreeNodePadding.prototype._level;
    /** @type {?} */
    CdkTreeNodePadding.prototype._indent;
    /** @type {?} */
    CdkTreeNodePadding.prototype._treeNode;
    /** @type {?} */
    CdkTreeNodePadding.prototype._tree;
    /** @type {?} */
    CdkTreeNodePadding.prototype._renderer;
    /** @type {?} */
    CdkTreeNodePadding.prototype._element;
    /** @type {?} */
    CdkTreeNodePadding.prototype._dir;
}
//# sourceMappingURL=padding.js.map