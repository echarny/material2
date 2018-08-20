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
import { Directive, Input } from '@angular/core';
import { CdkTreeNodeToggle, CdkTree, CdkTreeNode } from '@angular/cdk/tree';
/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 * @template T
 */
var MatTreeNodeToggle = /** @class */ (function (_super) {
    tslib_1.__extends(MatTreeNodeToggle, _super);
    // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
    // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
    // fixed bug.
    // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
    // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
    function MatTreeNodeToggle(_tree, _treeNode) {
        var _this = _super.call(this, _tree, _treeNode) || this;
        _this.recursive = false;
        return _this;
    }
    MatTreeNodeToggle.decorators = [
        { type: Directive, args: [{
                    selector: '[matTreeNodeToggle]',
                    host: {
                        '(click)': '_toggle($event)',
                    },
                    providers: [{ provide: CdkTreeNodeToggle, useExisting: MatTreeNodeToggle }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNodeToggle.ctorParameters = function () { return [
        { type: CdkTree, },
        { type: CdkTreeNode, },
    ]; };
    MatTreeNodeToggle.propDecorators = {
        "recursive": [{ type: Input, args: ['matTreeNodeToggleRecursive',] },],
    };
    return MatTreeNodeToggle;
}(CdkTreeNodeToggle));
export { MatTreeNodeToggle };
function MatTreeNodeToggle_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MatTreeNodeToggle.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MatTreeNodeToggle.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MatTreeNodeToggle.propDecorators;
    /** @type {?} */
    MatTreeNodeToggle.prototype.recursive;
}
//# sourceMappingURL=toggle.js.map