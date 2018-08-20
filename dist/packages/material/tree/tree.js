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
var outlet_1 = require("./outlet");
/**
 * Wrapper for the CdkTable with Material design styles.
 */
var MatTree = /** @class */ (function (_super) {
    __extends(MatTree, _super);
    // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
    // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
    // fixed bug.
    // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
    // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
    function MatTree(_differs, _changeDetectorRef) {
        return _super.call(this, _differs, _changeDetectorRef) || this;
    }
    MatTree.decorators = [
        { type: core_1.Component, args: [{selector: 'mat-tree',
                    exportAs: 'matTree',
                    template: "<ng-container matTreeNodeOutlet></ng-container>",
                    host: {
                        'class': 'mat-tree',
                        'role': 'tree',
                    },
                    styles: [".mat-tree{display:block}.mat-tree-node{display:flex;align-items:center;min-height:48px;flex:1;overflow:hidden;word-wrap:break-word}.mat-nested-tree-ndoe{border-bottom-width:0}"],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    providers: [{ provide: tree_1.CdkTree, useExisting: MatTree }]
                },] },
    ];
    /** @nocollapse */
    MatTree.ctorParameters = function () { return [
        { type: core_1.IterableDiffers, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    MatTree.propDecorators = {
        "_nodeOutlet": [{ type: core_1.ViewChild, args: [outlet_1.MatTreeNodeOutlet,] },],
    };
    return MatTree;
}(tree_1.CdkTree));
exports.MatTree = MatTree;
//# sourceMappingURL=tree.js.map