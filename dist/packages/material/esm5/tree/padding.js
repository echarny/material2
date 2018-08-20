/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { CdkTreeNodePadding, CdkTreeNode, CdkTree } from '@angular/cdk/tree';
import { Directionality } from '@angular/cdk/bidi';
import { Directive, Input, Optional, Renderer2, ElementRef } from '@angular/core';
/**
 * Wrapper for the CdkTree padding with Material design styles.
 * @template T
 */
var MatTreeNodePadding = /** @class */ (function (_super) {
    tslib_1.__extends(MatTreeNodePadding, _super);
    // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
    // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
    // fixed bug.
    // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
    // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
    function MatTreeNodePadding(_treeNode, _tree, _renderer, _element, _dir) {
        return _super.call(this, _treeNode, _tree, _renderer, _element, _dir) || this;
    }
    MatTreeNodePadding.decorators = [
        { type: Directive, args: [{
                    selector: '[matTreeNodePadding]',
                    providers: [{ provide: CdkTreeNodePadding, useExisting: MatTreeNodePadding }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNodePadding.ctorParameters = function () { return [
        { type: CdkTreeNode, },
        { type: CdkTree, },
        { type: Renderer2, },
        { type: ElementRef, },
        { type: Directionality, decorators: [{ type: Optional },] },
    ]; };
    MatTreeNodePadding.propDecorators = {
        "level": [{ type: Input, args: ['matTreeNodePadding',] },],
        "indent": [{ type: Input, args: ['matTreeNodePaddingIndent',] },],
    };
    return MatTreeNodePadding;
}(CdkTreeNodePadding));
export { MatTreeNodePadding };
function MatTreeNodePadding_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTreeNodePadding.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTreeNodePadding.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatTreeNodePadding.propDecorators;
    /**
     * The level of depth of the tree node. The padding will be `level * indent` pixels.
     * @type {?}
     */
    MatTreeNodePadding.prototype.level;
    /**
     * The indent for each level. Default number 40px from material design menu sub-menu spec.
     * @type {?}
     */
    MatTreeNodePadding.prototype.indent;
}
//# sourceMappingURL=padding.js.map