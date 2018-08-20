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
Object.defineProperty(exports, "__esModule", { value: true });
var tree_1 = require("@angular/cdk/tree");
var bidi_1 = require("@angular/cdk/bidi");
var core_1 = require("@angular/core");
/**
 * Wrapper for the CdkTree padding with Material design styles.
 */
var MatTreeNodePadding = /** @class */ (function (_super) {
    __extends(MatTreeNodePadding, _super);
    // TODO(andrewseguin): Remove this explicitly set constructor when the compiler knows how to
    // properly build the es6 version of the class. Currently sets ctorParameters to empty due to a
    // fixed bug.
    // https://github.com/angular/tsickle/pull/760 - tsickle PR that fixed this
    // https://github.com/angular/angular/pull/23531 - updates compiler-cli to fixed version
    function MatTreeNodePadding(_treeNode, _tree, _renderer, _element, _dir) {
        return _super.call(this, _treeNode, _tree, _renderer, _element, _dir) || this;
    }
    MatTreeNodePadding.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[matTreeNodePadding]',
                    providers: [{ provide: tree_1.CdkTreeNodePadding, useExisting: MatTreeNodePadding }]
                },] },
    ];
    /** @nocollapse */
    MatTreeNodePadding.ctorParameters = function () { return [
        { type: tree_1.CdkTreeNode, },
        { type: tree_1.CdkTree, },
        { type: core_1.Renderer2, },
        { type: core_1.ElementRef, },
        { type: bidi_1.Directionality, decorators: [{ type: core_1.Optional },] },
    ]; };
    MatTreeNodePadding.propDecorators = {
        "level": [{ type: core_1.Input, args: ['matTreeNodePadding',] },],
        "indent": [{ type: core_1.Input, args: ['matTreeNodePaddingIndent',] },],
    };
    return MatTreeNodePadding;
}(tree_1.CdkTreeNodePadding));
exports.MatTreeNodePadding = MatTreeNodePadding;
//# sourceMappingURL=padding.js.map