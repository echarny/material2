"use strict";
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
var common_1 = require("@angular/common");
var core_2 = require("@angular/material/core");
var node_1 = require("./node");
var tree_2 = require("./tree");
var toggle_1 = require("./toggle");
var outlet_1 = require("./outlet");
var padding_1 = require("./padding");
var MAT_TREE_DIRECTIVES = [
    node_1.MatNestedTreeNode,
    node_1.MatTreeNodeDef,
    padding_1.MatTreeNodePadding,
    toggle_1.MatTreeNodeToggle,
    tree_2.MatTree,
    node_1.MatTreeNode,
    outlet_1.MatTreeNodeOutlet
];
var MatTreeModule = /** @class */ (function () {
    function MatTreeModule() {
    }
    MatTreeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [tree_1.CdkTreeModule, common_1.CommonModule, core_2.MatCommonModule],
                    exports: MAT_TREE_DIRECTIVES,
                    declarations: MAT_TREE_DIRECTIVES,
                },] },
    ];
    return MatTreeModule;
}());
exports.MatTreeModule = MatTreeModule;
//# sourceMappingURL=tree-module.js.map