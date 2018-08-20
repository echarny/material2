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
var core_1 = require("@angular/core");
var tree_1 = require("@angular/cdk/tree");
/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 */
var MatTreeNodeToggle = /** @class */ (function (_super) {
    __extends(MatTreeNodeToggle, _super);
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
        { type: core_1.Directive, args: [{
                    selector: '[matTreeNodeToggle]',
                    host: {
                        '(click)': '_toggle($event)',
                    },
                    providers: [{ provide: tree_1.CdkTreeNodeToggle, useExisting: MatTreeNodeToggle }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNodeToggle.ctorParameters = function () { return [
        { type: tree_1.CdkTree, },
        { type: tree_1.CdkTreeNode, },
    ]; };
    MatTreeNodeToggle.propDecorators = {
        "recursive": [{ type: core_1.Input, args: ['matTreeNodeToggleRecursive',] },],
    };
    return MatTreeNodeToggle;
}(tree_1.CdkTreeNodeToggle));
exports.MatTreeNodeToggle = MatTreeNodeToggle;
//# sourceMappingURL=toggle.js.map