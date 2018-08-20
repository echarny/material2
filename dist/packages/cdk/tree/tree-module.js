"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var a11y_1 = require("@angular/cdk/a11y");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var outlet_1 = require("./outlet");
var padding_1 = require("./padding");
var toggle_1 = require("./toggle");
var tree_1 = require("./tree");
var node_1 = require("./node");
var nested_node_1 = require("./nested-node");
var EXPORTED_DECLARATIONS = [
    nested_node_1.CdkNestedTreeNode,
    node_1.CdkTreeNodeDef,
    padding_1.CdkTreeNodePadding,
    toggle_1.CdkTreeNodeToggle,
    tree_1.CdkTree,
    tree_1.CdkTreeNode,
    outlet_1.CdkTreeNodeOutlet,
];
var CdkTreeModule = /** @class */ (function () {
    function CdkTreeModule() {
    }
    CdkTreeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                    providers: [a11y_1.FocusMonitor, node_1.CdkTreeNodeDef]
                },] },
    ];
    return CdkTreeModule;
}());
exports.CdkTreeModule = CdkTreeModule;
//# sourceMappingURL=tree-module.js.map